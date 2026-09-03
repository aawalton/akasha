import { existsSync } from "node:fs"
import type { Answer, Given } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { DEFAULT_CLUSTER_NAME } from "@akasha/talos/talos-nodes"
import { clusterTalosconfigPath } from "@akasha/talos/talos-paths"
import { runTalosctl } from "@akasha/talos/talosctl"

export const IP = "--ip"

export const CLUSTER = "--cluster"

const VALUED: readonly string[] = [IP, CLUSTER]

const INPUT = 1

const OPERATIONAL = 3

export type Named = { readonly ip: string; readonly cluster: string }

export type Read = Named | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  const flags = new Map<string, string>()
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (!one.startsWith("-")) {
      refusals.push(`\`${one}\` is no word this takes — it takes \`${VALUED.join("`, `")}\``)
      continue
    }
    const cut = one.indexOf("=")
    const name = cut === -1 ? one : one.slice(0, cut)
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
  const ip = flags.get(IP)
  if (ip === undefined) refusals.push(`this names \`${IP}\`, and nothing did`)
  if (ip === undefined || refusals.length > 0) return { refused: refusals }
  return { ip, cluster: flags.get(CLUSTER) ?? DEFAULT_CLUSTER_NAME }
}

async function bootstrapping(read: Named, given: Given): Promise<Answer> {
  const talosconfig = clusterTalosconfigPath(read.cluster)
  if (!existsSync(talosconfig)) {
    return {
      report: [],
      refusals: [
        `no talosconfig stands at ${talosconfig}`,
        `\`${given.calledAs} talos-apply --node <id> ${IP} ${read.ip}\` writes it, and this reads it`,
      ],
      code: INPUT,
    }
  }
  await runTalosctl({
    args: ["--talosconfig", talosconfig, "bootstrap", "--nodes", read.ip, "--endpoints", read.ip],
  })
  return {
    report: [`etcd was bootstrapped on ${read.ip} for ${read.cluster}`],
    refusals: [],
    code: 0,
  }
}

export async function talosBootstrap(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: INPUT }
  try {
    return await bootstrapping(read, given)
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: OPERATIONAL }
  }
}
