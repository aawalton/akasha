import { existsSync } from "node:fs"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { cluster as clusterArgument } from "akasha/commands/arguments/pages/cluster.argument.ts"
import { controlPlaneIps } from "akasha/commands/arguments/pages/control-plane-ips.argument.ts"
import { ip as ipArgument } from "akasha/commands/arguments/pages/ip.argument.ts"
import { workerIps } from "akasha/commands/arguments/pages/worker-ips.argument.ts"
import {
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { talosHealth as page } from "akasha/commands/pages/talos/health/talos-health.command.ts"
import { DEFAULT_CLUSTER_NAME } from "akasha/infrastructure/cluster/provisioning/talos/nodes/nodes.module.code.ts"
import { clusterTalosconfigPath } from "akasha/infrastructure/cluster/provisioning/talos/paths/paths.module.code.ts"
import { runTalosctl } from "akasha/infrastructure/cluster/provisioning/talos/talosctl/talosctl.module.code.ts"

export type Named = {
  readonly ip: string
  readonly cluster: string
  readonly controlPlanes: readonly string[]
  readonly workers: readonly string[]
}

export function commaed(value: string | undefined): readonly string[] {
  if (value === undefined) return []
  return value
    .split(",")
    .map((one) => one.trim())
    .filter((one) => one.length > 0)
}

async function checking(read: Named, given: Given): Promise<Answer> {
  const talosconfig = clusterTalosconfigPath(read.cluster)
  if (!existsSync(talosconfig)) {
    return mistaking([
      `no talosconfig is at ${talosconfig}`,
      `\`${given.calledAs} talos apply --node <id> ${ipArgument.said} ${read.ip}\` writes it, and this reads it`,
    ])
  }
  const controlPlanes = read.controlPlanes.join(",")
  await runTalosctl({
    args: [
      "--talosconfig",
      talosconfig,
      "health",
      "--nodes",
      read.ip,
      "--endpoints",
      controlPlanes,
      "--control-plane-nodes",
      controlPlanes,
      ...(read.workers.length > 0 ? ["--worker-nodes", read.workers.join(",")] : []),
    ],
  })
  return told([`${read.ip} answered the health check for ${read.cluster}`])
}

export async function talosHealth(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [
    clusterArgument,
    ipArgument,
    controlPlaneIps,
    workerIps,
  ])
  if ("refused" in read) return mistaking(read.refused)
  const named = commaed(read.taken.controlPlaneIps)
  try {
    return await checking(
      {
        ip: read.taken.ip,
        cluster: read.taken.cluster ?? DEFAULT_CLUSTER_NAME,
        controlPlanes: named.length > 0 ? named : [read.taken.ip],
        workers: commaed(read.taken.workerIps),
      },
      given
    )
  } catch (thrown) {
    return refusedBy([whyOf(thrown)], OPERATIONAL)
  }
}
