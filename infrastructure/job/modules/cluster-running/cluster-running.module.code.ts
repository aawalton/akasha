import { type PushOutcome, pushBranch } from "akasha/git/modules/pushing/git-pushing.module.code.ts"
import {
  type Carried,
  carriedByOrigin,
} from "akasha/infrastructure/service/cluster/modules/web-app-building/web-app-building.module.code.ts"
import {
  type Plan,
  type Ran,
  runKubectl,
  runKubectlOn,
} from "akasha/infrastructure/service/cluster/modules/workload-deploying/workload-deploying.module.code.ts"
import { placeSecrets } from "akasha/infrastructure/service/secret/modules/placing/secret-placing.module.code.ts"

export const JOB_NAMESPACE = "workers"

export const WAITED_ROUNDS = 180

const WAITED_ONCE = "10s"

const AT_ONCE = "1s"

const COMPLETE = "condition=Complete"

const FAILED = "condition=Failed"

const EVERY_LINE = "--tail=-1"

const JOB = "Job"

export type Running = (argv: readonly string[], text: string | null) => Ran

export type Carrying = (root: string, commit: string) => Carried

export type Pushing = (root: string) => PushOutcome

export type Ended = { readonly said: readonly string[] } | { readonly why: string }

export type Fate = "complete" | "failed" | "running"

export function applyArgv(): readonly string[] {
  return ["apply", "-f", "-"]
}

export function planFor(name: string, yaml: string): Plan {
  return {
    workload: { kind: JOB, name, namespace: JOB_NAMESPACE },
    synthPath: name,
    manifests: [
      { name, path: name, yaml, kind: JOB, resourceName: name, namespace: JOB_NAMESPACE },
    ],
  }
}

export function waitArgv(name: string, forWhat: string, waited: string): readonly string[] {
  return ["wait", "-n", JOB_NAMESPACE, `job/${name}`, `--for=${forWhat}`, `--timeout=${waited}`]
}

export function logsArgv(name: string): readonly string[] {
  return ["logs", "-n", JOB_NAMESPACE, `job/${name}`, EVERY_LINE]
}

export const ranBy: Running = (argv, text) =>
  text === null ? runKubectl(argv) : runKubectlOn(argv, text)

export function endedBy(fate: Fate, lines: Ran, name: string): Ended {
  const said = lines.stdout.trim() === "" ? [] : lines.stdout.trim().split("\n")
  if (fate === "complete") return { said }
  if (fate === "failed") return { why: [`the job ${name} failed`, ...said].join("\n") }
  return { why: `the job ${name} had not ended, so its lines are all that is known` }
}

export function fateOf(running: Running, name: string, rounds: number): Fate {
  for (let round = 0; round < rounds; round += 1) {
    if (running(waitArgv(name, COMPLETE, WAITED_ONCE), null).code === 0) return "complete"
    if (running(waitArgv(name, FAILED, AT_ONCE), null).code === 0) return "failed"
  }
  return "running"
}

export function carriedAt(
  root: string,
  commit: string,
  carrying: Carrying,
  pushing: Pushing
): string | null {
  const carried = carrying(root, commit)
  if ("why" in carried) return carried.why
  if (carried.carried) return null
  const pushed = pushing(root)
  if (pushed.failed) return `origin does not carry ${commit} and ${pushed.line}`
  const again = carrying(root, commit)
  if ("why" in again) return again.why
  if (again.carried) return null
  return `origin does not carry ${commit}, so no job in the cluster can read it`
}

export async function jobRan(
  root: string,
  commit: string,
  name: string,
  yaml: string,
  rounds: number = WAITED_ROUNDS,
  running: Running = ranBy,
  carrying: Carrying = carriedByOrigin,
  pushing: Pushing = pushBranch
): Promise<Ended> {
  const why = carriedAt(root, commit, carrying, pushing)
  if (why !== null) return { why }
  const placing = placeSecrets(root, planFor(name, yaml))
  if (placing.unplaced.length > 0) {
    const short = placing.unplaced.map((one) => `${one.name}/${one.key}`).join(", ")
    return { why: `no secret page places ${short}, so the job would read no repository` }
  }
  const put = running(applyArgv(), yaml)
  if (put.code !== 0) {
    return { why: `the job ${name} would not go up: ${put.stderr.trim()}` }
  }
  return endedBy(fateOf(running, name, rounds), running(logsArgv(name), null), name)
}
