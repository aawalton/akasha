import { existsSync } from "node:fs"
import { mkdir, mkdtemp, rm, stat } from "node:fs/promises"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import type { Answer } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { DEFAULT_CLUSTER_NAME } from "@akasha/talos/talos-nodes"
import { clusterSecretsSopsPath } from "@akasha/talos/talos-paths"
import { encryptFile } from "@akasha/talos/talos-sops"
import { runTalosctl } from "@akasha/talos/talosctl"

export const CLUSTER = "--cluster"

export const FORCE = "--force"

const VALUED: readonly string[] = [CLUSTER]

const BARE: readonly string[] = [FORCE]

const INPUT = 1

const OPERATIONAL = 3

export type Named = { readonly cluster: string; readonly force: boolean }

export type Read = Named | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  const flags = new Map<string, string>()
  let force = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (!one.startsWith("-")) {
      refusals.push(`\`${one}\` is no word this takes — it takes \`${CLUSTER}\` and \`${FORCE}\``)
      continue
    }
    const cut = one.indexOf("=")
    const name = cut === -1 ? one : one.slice(0, cut)
    if (BARE.includes(name)) {
      if (cut === -1) force = true
      else refusals.push(`\`${name}\` carries no value, and \`${one}\` hands it one`)
      continue
    }
    if (!VALUED.includes(name)) {
      refusals.push(`\`${name}\` is no flag this takes — it takes \`${CLUSTER}\` and \`${FORCE}\``)
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
  if (refusals.length > 0) return { refused: refusals }
  return { cluster: flags.get(CLUSTER) ?? DEFAULT_CLUSTER_NAME, force }
}

async function generating(read: Named): Promise<Answer> {
  const destPath = clusterSecretsSopsPath(read.cluster)
  if (existsSync(destPath) && !read.force) {
    return {
      report: [],
      refusals: [
        `a secrets file already stands at ${destPath}`,
        `writing it again loses every node's PKI, so \`${FORCE}\` is what says a rotation is meant`,
      ],
      code: INPUT,
    }
  }
  await mkdir(dirname(destPath), { recursive: true })
  const workDir = await mkdtemp(join(tmpdir(), "talos-secrets-gen-"))
  const tmpSecretsPath = join(workDir, "secrets.yaml")
  try {
    await runTalosctl({ args: ["gen", "secrets", "-o", tmpSecretsPath, "--force"] })
    const info = await stat(tmpSecretsPath)
    if (info.size === 0) {
      return { report: [], refusals: ["talosctl gen secrets wrote nothing"], code: OPERATIONAL }
    }
    await encryptFile(tmpSecretsPath, destPath)
  } finally {
    await rm(workDir, { recursive: true, force: true })
  }
  return {
    report: [`wrote the SOPS-encrypted secrets to ${destPath}`],
    refusals: [],
    code: 0,
  }
}

export async function talosSecretsGen(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: INPUT }
  try {
    return await generating(read)
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: OPERATIONAL }
  }
}
