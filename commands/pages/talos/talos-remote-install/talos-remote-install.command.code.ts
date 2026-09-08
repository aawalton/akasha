import type { Answer, Given } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { buildSchematic } from "@akasha/talos/talos-build-schematic"
import { emitSchematicYaml } from "@akasha/talos/talos-emit-yaml"
import {
  metalCmdlineUrl,
  metalInitramfsUrl,
  metalKernelUrl,
  metalRawXzUrl,
  registerSchematic,
} from "@akasha/talos/talos-factory"
import { getClusterForNode, getNode } from "@akasha/talos/talos-nodes"
import type { ClusterIntent, NodeIntent } from "@akasha/talos/talos-schema"
import { runSsh } from "@akasha/talos/talos-ssh"
import { waitForPort } from "@akasha/talos/talos-wait-for-port"

export const NODE = "--node"

export const IP = "--ip"

export const SSH_USER = "--ssh-user"

export const SSH_KEY = "--ssh-key"

export const METHOD = "--method"

export const CONFIRM_WIPE = "--confirm-wipe"

export const AUTO = "auto"

export const KEXEC = "kexec"

export const DD = "dd"

export const METHODS = [AUTO, KEXEC, DD] as const

export type Method = (typeof METHODS)[number]

const VALUED: readonly string[] = [NODE, IP, SSH_USER, SSH_KEY, METHOD]

const BARE: readonly string[] = [CONFIRM_WIPE]

const INPUT = 1

const OPERATIONAL = 3

const MAINTENANCE_PORT = 50000

const WAIT_MS = 30 * 60 * 1000

const TICK_MS = 5000

export type Named = {
  readonly node: string
  readonly ip: string
  readonly sshUser: string
  readonly sshKey: string
  readonly method: Method
  readonly confirmWipe: boolean
}

export type Read = Named | { readonly refused: readonly string[] }

function methodIn(said: string | undefined): Method | null {
  if (said === undefined) return AUTO
  for (const one of METHODS) {
    if (one === said) return one
  }
  return null
}

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  const flags = new Map<string, string>()
  const words: string[] = []
  let confirmWipe = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (!one.startsWith("-")) {
      words.push(one)
      continue
    }
    const cut = one.indexOf("=")
    const name = cut === -1 ? one : one.slice(0, cut)
    if (BARE.includes(name)) {
      if (cut === -1) confirmWipe = true
      else refusals.push(`\`${name}\` carries no value, and \`${one}\` hands it one`)
      continue
    }
    if (!VALUED.includes(name)) {
      refusals.push(`\`${name}\` is no flag this takes — it takes \`${VALUED.join("`, `")}\``)
      continue
    }
    if (cut !== -1) {
      flags.set(name, one.slice(cut + 1))
      continue
    }
    const next = argv[at + 1]
    if (next === undefined || next.startsWith("-")) {
      refusals.push(`\`${name}\` names a value, and nothing followed it`)
      continue
    }
    flags.set(name, next)
    at += 1
  }
  const said = words[0]
  if (said !== undefined) {
    if (flags.has(NODE)) {
      refusals.push(`the node is named twice — \`${said}\` as a word and after \`${NODE}\``)
    } else {
      flags.set(NODE, said)
    }
  }
  if (words.length > 1) {
    refusals.push(`this names one node, and ${words.length} words were said`)
  }
  const node = flags.get(NODE)
  if (node === undefined) {
    refusals.push(`this names the node to install, as a word or after \`${NODE}\``)
  }
  const ip = flags.get(IP)
  if (ip === undefined) refusals.push(`this names \`${IP}\`, and nothing did`)
  const sshUser = flags.get(SSH_USER)
  if (sshUser === undefined) refusals.push(`this names \`${SSH_USER}\`, and nothing did`)
  const sshKey = flags.get(SSH_KEY)
  if (sshKey === undefined) refusals.push(`this names \`${SSH_KEY}\`, and nothing did`)
  const method = methodIn(flags.get(METHOD))
  if (method === null) {
    refusals.push(
      `\`${flags.get(METHOD)}\` is no method — \`${METHODS.join("`, `")}\` are the methods`
    )
  }
  if (
    node === undefined ||
    ip === undefined ||
    sshUser === undefined ||
    sshKey === undefined ||
    method === null ||
    refusals.length > 0
  ) {
    return { refused: refusals }
  }
  return { node, ip, sshUser, sshKey, method, confirmWipe }
}

export type Urls = {
  readonly raw: string
  readonly kernel: string
  readonly initramfs: string
  readonly cmdline: string
}

function preflightBody(): string {
  return `can_kexec() {
  if [ -r /sys/kernel/kexec_load_disabled ] && [ "$(cat /sys/kernel/kexec_load_disabled)" != "0" ]; then
    echo "[remote] kexec disabled: /sys/kernel/kexec_load_disabled=1" >&2
    return 1
  fi
  if [ -r /sys/kernel/security/lockdown ]; then
    if ! grep -q '\\[none\\]' /sys/kernel/security/lockdown; then
      echo "[remote] kexec blocked: kernel lockdown is active ($(cat /sys/kernel/security/lockdown))" >&2
      return 1
    fi
  fi
  local sb_var
  sb_var=$(ls /sys/firmware/efi/efivars/SecureBoot-* 2>/dev/null | head -n1 || true)
  if [ -n "$sb_var" ] && [ -s "$sb_var" ]; then
    if [ "$(od -An -t u1 "$sb_var" | awk '{print $5}')" = "1" ]; then
      echo "[remote] kexec blocked: UEFI Secure Boot is enforcing" >&2
      return 1
    fi
  fi
  if ! command -v kexec >/dev/null; then
    echo "[remote] kexec binary missing — attempting apt-get install kexec-tools"
    if ! sudo DEBIAN_FRONTEND=noninteractive apt-get install -y kexec-tools; then
      echo "[remote] apt-get install kexec-tools failed" >&2
      return 1
    fi
  fi
  return 0
}
`
}

function kexecBody(urls: Urls): string {
  return `echo "[remote] kexec: downloading installer kernel + initramfs from factory.talos.dev"
if ! command -v kexec >/dev/null; then
  sudo DEBIAN_FRONTEND=noninteractive apt-get install -y kexec-tools
fi
curl -fsSL ${urls.kernel} -o /tmp/talos-kernel
curl -fsSL ${urls.initramfs} -o /tmp/talos-initramfs.xz
TALOS_CMDLINE=$(curl -fsSL ${urls.cmdline})
echo "[remote] kexec: loading kernel with cmdline=$TALOS_CMDLINE"
sudo kexec -l /tmp/talos-kernel --initrd=/tmp/talos-initramfs.xz --command-line="$TALOS_CMDLINE"
echo "[remote] kexec: handoff in 3s (systemctl kexec, fallback bare kexec -e)"
nohup sudo bash -c 'sleep 3 && (systemctl kexec || kexec -e)' >/dev/null 2>&1 &
`
}

function ddBody(rawUrl: string, installDisk: string): string {
  return `echo "[remote] dd: writing ${rawUrl} to ${installDisk}"
curl -fsSL ${rawUrl} | xz -d | sudo dd of=${installDisk} bs=4M oflag=direct conv=fsync status=progress
sudo sync
echo "[remote] dd: creating UEFI NVRAM entry via efibootmgr (belt-and-suspenders for #11447 UEFI gap)"
sudo efibootmgr --create --disk ${installDisk} --part 1 --loader '\\EFI\\BOOT\\BOOTX64.EFI' --label 'Talos' \\
  || echo "[remote] WARN: efibootmgr --create failed; first boot may need manual UEFI fix"
echo "[remote] dd: scheduling reboot in 5s"
nohup sudo bash -c 'sleep 5 && reboot' >/dev/null 2>&1 &
`
}

export function installScript(
  method: Method,
  urls: Urls,
  installDisk: string | null
): string | null {
  const preflight = preflightBody()
  const kexec = kexecBody(urls)
  if (method === KEXEC) {
    return `set -euo pipefail\n\n${preflight}\nif ! can_kexec; then\n  echo "[remote] --method=kexec but host is not eligible — refusing to fall back" >&2\n  exit 1\nfi\n${kexec}\nexit 0\n`
  }
  if (installDisk === null) return null
  const dd = ddBody(urls.raw, installDisk)
  if (method === DD) return `set -euo pipefail\n\n${dd}\nexit 0\n`
  return `set -euo pipefail\n\n${preflight}\nif can_kexec; then\n  echo "[remote] auto: kexec eligible — using kexec"\n${kexec}else\n  echo "[remote] auto: kexec ineligible — falling back to dd"\n${dd}fi\nexit 0\n`
}

async function installing(read: Named, given: Given): Promise<Answer> {
  let node: NodeIntent
  let cluster: ClusterIntent
  try {
    node = getNode(read.node)
    cluster = getClusterForNode(read.node)
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: INPUT }
  }

  const installDisk = node.installDisk ?? null
  if (installDisk === null && read.method !== KEXEC) {
    return {
      report: [],
      refusals: [
        `${node.id} states a disk selector rather than a fixed disk, and \`${read.method}\` needs a device path`,
        `\`${METHOD} ${KEXEC}\` leaves the selector to the apply, as does booting the node into maintenance mode`,
      ],
      code: INPUT,
    }
  }
  if (!read.confirmWipe) {
    return {
      report: [],
      refusals: [
        `${installDisk ?? "the disk the selector matches"} on ${read.ip} is wiped, and \`${CONFIRM_WIPE}\` did not say so`,
      ],
      code: INPUT,
    }
  }

  const schematicId = await registerSchematic(emitSchematicYaml(buildSchematic(node)))
  const version = cluster.talosVersion
  const urls: Urls = {
    raw: metalRawXzUrl(schematicId, version),
    kernel: metalKernelUrl(schematicId, version),
    initramfs: metalInitramfsUrl(schematicId, version),
    cmdline: metalCmdlineUrl(schematicId, version),
  }
  const script = installScript(read.method, urls, installDisk)
  if (script === null) {
    return {
      report: [],
      refusals: [`\`${read.method}\` needs a fixed install disk, and ${node.id} states none`],
      code: INPUT,
    }
  }

  const report = [
    `schematic id: ${schematicId}`,
    `method: ${read.method}`,
    `provisioning Talos on ${read.ip} over ${read.method}`,
  ]
  await runSsh({ user: read.sshUser, host: read.ip, keyPath: read.sshKey, script })
  report.push(
    `the handoff is scheduled — waiting for maintenance mode at ${read.ip}:${MAINTENANCE_PORT}`
  )
  await waitForPort({
    host: read.ip,
    port: MAINTENANCE_PORT,
    timeoutMs: WAIT_MS,
    intervalMs: TICK_MS,
  })
  report.push(`Talos is up at ${read.ip}`)
  report.push(
    `\`${given.calledAs} talos-apply ${NODE} ${node.id} ${IP} ${read.ip}\` takes it into its cluster`
  )
  return { report, refusals: [], code: 0 }
}

export async function talosRemoteInstall(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: INPUT }
  try {
    return await installing(read, given)
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: OPERATIONAL }
  }
}
