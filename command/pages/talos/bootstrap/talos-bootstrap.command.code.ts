import { existsSync } from "node:fs"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { cluster as clusterArgument } from "akasha/command/argument/pages/cluster.argument.ts"
import { ip as ipArgument } from "akasha/command/argument/pages/ip.argument.ts"
import {
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { talosBootstrap as page } from "akasha/command/pages/talos/bootstrap/talos-bootstrap.command.ts"
import { clusterTalosconfigPath } from "akasha/infrastructure/cluster/provisioning/talos/modules/paths/paths.module.code.ts"
import { runTalosctl } from "akasha/infrastructure/cluster/provisioning/talos/modules/talosctl/talosctl.module.code.ts"

type Named = { readonly ip: string; readonly cluster: string }

async function bootstrapping(read: Named, given: Given): Promise<Answer> {
  const cluster = read.cluster
  const talosconfig = clusterTalosconfigPath(cluster)
  if (!existsSync(talosconfig)) {
    return mistaking([
      `no talosconfig is at ${talosconfig}`,
      `\`${given.calledAs} talos apply --node <id> ${ipArgument.said} ${read.ip}\` writes it, and this reads it`,
    ])
  }
  await runTalosctl({
    args: ["--talosconfig", talosconfig, "bootstrap", "--nodes", read.ip, "--endpoints", read.ip],
  })
  return told([`etcd was bootstrapped on ${read.ip} for ${cluster}`])
}

export async function talosBootstrap(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [clusterArgument, ipArgument])
  if ("refused" in read) return mistaking(read.refused)
  try {
    return await bootstrapping(read.taken, given)
  } catch (thrown) {
    return refusedBy([whyOf(thrown)], OPERATIONAL)
  }
}
