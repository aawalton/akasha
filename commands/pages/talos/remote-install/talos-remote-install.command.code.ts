import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { confirmWipe as confirmWipeArgument } from "akasha/commands/arguments/pages/confirm-wipe.argument.ts"
import { ip as ipArgument } from "akasha/commands/arguments/pages/ip.argument.ts"
import { method as methodArgument } from "akasha/commands/arguments/pages/method.argument.ts"
import { node as nodeArgument } from "akasha/commands/arguments/pages/node.argument.ts"
import { sshKey as sshKeyArgument } from "akasha/commands/arguments/pages/ssh-key.argument.ts"
import { sshUser as sshUserArgument } from "akasha/commands/arguments/pages/ssh-user.argument.ts"
import { answering, told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { talosRemoteInstall as page } from "akasha/commands/pages/talos/remote-install/talos-remote-install.command.ts"
import { buildSchematic } from "akasha/infrastructure/cluster/provisioning/talos/build-schematic/build-schematic.module.code.ts"
import { emitSchematicYaml } from "akasha/infrastructure/cluster/provisioning/talos/emit-yaml/emit-yaml.module.code.ts"
import {
  metalCmdlineUrl,
  metalInitramfsUrl,
  metalKernelUrl,
  metalRawXzUrl,
  registerSchematic,
} from "akasha/infrastructure/cluster/provisioning/talos/factory/factory.module.code.ts"
import {
  getClusterForNode,
  getNode,
} from "akasha/infrastructure/cluster/provisioning/talos/nodes/nodes.module.code.ts"
import type {
  ClusterIntent,
  NodeIntent,
} from "akasha/infrastructure/cluster/provisioning/talos/schema/schema.module.code.ts"
import { runSsh } from "akasha/infrastructure/cluster/provisioning/talos/ssh/ssh.module.code.ts"
import { waitForPort } from "akasha/infrastructure/cluster/provisioning/talos/wait-for-port/wait-for-port.module.code.ts"

export const AUTO = "auto"

export const KEXEC = "kexec"

export const DD = "dd"

export const METHODS = [AUTO, KEXEC, DD] as const

export type Method = (typeof METHODS)[number]

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

function methodIn(said: string | undefined): Method | null {
  if (said === undefined) return AUTO
  for (const one of METHODS) {
    if (one === said) return one
  }
  return null
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

export type Reaching = typeof runSsh

export type Waiting = typeof waitForPort

export function handoverSaid(read: Named): string {
  return (
    `the handover ran on ${read.ip} over ${read.method},` +
    " and that host is no longer running what it ran before"
  )
}

export async function handedOver(
  read: Named,
  script: string,
  reaching: Reaching,
  waiting: Waiting,
  done: string[]
): Promise<undefined> {
  await reaching({ user: read.sshUser, host: read.ip, keyPath: read.sshKey, script })
  done.push(handoverSaid(read))
  await waiting({
    host: read.ip,
    port: MAINTENANCE_PORT,
    timeoutMs: WAIT_MS,
    intervalMs: TICK_MS,
  })
  return undefined
}

async function installing(
  read: Named,
  given: Given,
  reaching: Reaching,
  waiting: Waiting,
  done: string[]
): Promise<Answer> {
  let node: NodeIntent
  let cluster: ClusterIntent
  try {
    node = getNode(read.node)
    cluster = getClusterForNode(read.node)
  } catch (thrown) {
    return mistaking([whyOf(thrown)])
  }

  const installDisk = node.installDisk ?? null
  if (installDisk === null && read.method !== KEXEC) {
    return mistaking([
      `${node.id} states a disk selector rather than a fixed disk, and \`${read.method}\` needs a device path`,
      `\`${methodArgument.said} ${KEXEC}\` leaves the selector to the apply, as does booting the node into maintenance mode`,
    ])
  }
  if (!read.confirmWipe) {
    return mistaking([
      `${installDisk ?? "the disk the selector matches"} on ${read.ip} is wiped, and \`${confirmWipeArgument.said}\` did not say so`,
    ])
  }

  const schematicId = await registerSchematic(emitSchematicYaml(buildSchematic(node)))
  done.push(`the schematic ${schematicId} is registered with the factory`)
  const version = cluster.talosVersion
  const urls: Urls = {
    raw: metalRawXzUrl(schematicId, version),
    kernel: metalKernelUrl(schematicId, version),
    initramfs: metalInitramfsUrl(schematicId, version),
    cmdline: metalCmdlineUrl(schematicId, version),
  }
  const script = installScript(read.method, urls, installDisk)
  if (script === null) {
    return mistaking([`\`${read.method}\` needs a fixed install disk, and ${node.id} states none`])
  }

  await handedOver(read, script, reaching, waiting, done)
  return told([
    `schematic id: ${schematicId}`,
    `method: ${read.method}`,
    `provisioning Talos on ${read.ip} over ${read.method}`,
    `the handoff is scheduled — waiting for maintenance mode at ${read.ip}:${MAINTENANCE_PORT}`,
    `Talos is up at ${read.ip}`,
    `\`${given.calledAs} talos apply ${nodeArgument.said} ${node.id} ${ipArgument.said} ${read.ip}\` takes it into its cluster`,
  ])
}

export async function talosRemoteInstall(
  argv: readonly string[],
  given: Given,
  reaching: Reaching = runSsh,
  waiting: Waiting = waitForPort
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [
    nodeArgument,
    ipArgument,
    sshUserArgument,
    sshKeyArgument,
    methodArgument,
    confirmWipeArgument,
  ])
  if ("refused" in read) return mistaking(read.refused)
  const method = methodIn(read.taken.method)
  if (method === null) {
    return mistaking([
      `\`${read.taken.method}\` is no method — \`${METHODS.join("`, `")}\` are the methods`,
    ])
  }
  const named: Named = { ...read.taken, method }
  return await answering(async (done) => installing(named, given, reaching, waiting, done))
}
