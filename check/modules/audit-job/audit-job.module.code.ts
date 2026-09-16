import type { Round } from "akasha/check/modules/audit-asking/audit-asking.module.code.ts"
import { verdictsFor } from "akasha/check/modules/audit-asking/audit-asking.module.code.ts"
import type { Ran } from "akasha/check/modules/audit-serving/audit-serving.module.code.ts"
import { roundNow } from "akasha/check/modules/audit-serving/audit-serving.module.code.ts"
import { sortedOnce } from "akasha/code/type/narrowing/modules/sorted-once/sorted-once.module.code.ts"
import { check } from "akasha/command/argument/pages/check.argument.ts"
import { audit } from "akasha/command/pages/audit/audit.command.ts"
import {
  type Carrying,
  checkedOut,
  type Ended,
  jobRan,
  jobYamlFor,
  NAMED,
  type Pushing,
  type Running,
} from "akasha/infrastructure/job/modules/cluster-running/cluster-running.module.code.ts"
import { inCluster } from "akasha/infrastructure/job/modules/run-in-cluster/run-in-cluster.module.code.ts"
import { dispatcherIn } from "akasha/infrastructure/machine/provisioning/scripts/akasha-launcher/akasha-launcher.shell-script.scripting.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"

const RADIX = 36

const DIGEST = 8

export const WAITED_ROUNDS = 360

export function digestOf(checks: readonly string[]): string {
  return Bun.hash(sortedOnce(checks).join(",")).toString(RADIX).slice(0, DIGEST)
}

export function jobNameFor(commit: string, checks: readonly string[]): string {
  return `${audit.name}-${commit.slice(0, NAMED)}-${digestOf(checks)}`
}

export function scriptFor(
  given: string | Reading,
  checks: readonly string[],
  commit: string
): string {
  const named = sortedOnce(checks).map((one) => `${check.said} ${one}`)
  return [
    ...checkedOut(commit, null),
    `bun ${dispatcherIn(given)} ${audit.name} ${named.join(" ")} || true`,
  ].join("\n")
}

export function ranAfter(root: string, checks: readonly string[]): readonly Ran[] {
  const held = verdictsFor(root, checks)
  return sortedOnce(checks).flatMap((one) => {
    const verdict = held.get(one)
    return verdict === undefined ? [] : [{ check: one, verdict, ran: true }]
  })
}

export const roundHere: Round = async (checks) => ({ ran: (await roundNow(checks)).ran })

export function roundFor(root: string, commit: string): Round {
  if (inCluster()) return roundHere
  return async (checks) => {
    const ended = await roundInCluster(root, root, checks, commit)
    return "why" in ended ? { refused: ended.why } : { ran: ranAfter(root, checks) }
  }
}

export async function roundInCluster(
  given: string | Reading,
  root: string,
  checks: readonly string[],
  commit: string,
  running?: Running,
  carrying?: Carrying,
  pushing?: Pushing
): Promise<Ended> {
  return await jobRan(
    root,
    commit,
    jobNameFor(commit, checks),
    jobYamlFor(jobNameFor(commit, checks), scriptFor(given, checks, commit)),
    WAITED_ROUNDS,
    running,
    carrying,
    pushing
  )
}
