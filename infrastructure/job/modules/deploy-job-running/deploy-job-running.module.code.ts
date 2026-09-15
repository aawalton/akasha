import { commitRecordedIn } from "akasha/command/pages/deploy/modules/commit-recording/deploy-commit-recording.module.code.ts"
import { kindNamed } from "akasha/command/pages/deploy/modules/kind-reading/deploy-kind-reading.module.code.ts"
import { type PushOutcome, pushBranch } from "akasha/git/modules/pushing/git-pushing.module.code.ts"
import {
  JOB_NAMESPACE,
  jobNameFor,
  jobYamlFor,
} from "akasha/infrastructure/job/modules/deploy-job/deploy-job.module.code.ts"
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
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"

const WAITED_ONCE = "10s"

const AT_ONCE = "1s"

const WAITED_ROUNDS = 180

const COMPLETE = "condition=Complete"

const FAILED = "condition=Failed"

const EVERY_LINE = "--tail=-1"

export type Running = (argv: readonly string[], text: string | null) => Ran

export type Carrying = (root: string, commit: string) => Carried

export type Pushing = (root: string) => PushOutcome

export type Ended = { readonly said: readonly string[] } | { readonly why: string }

export function applyArgv(): readonly string[] {
  return ["apply", "-f", "-"]
}

function planFor(name: string, yaml: string): Plan {
  return {
    workload: { kind: "Job", name, namespace: JOB_NAMESPACE },
    synthPath: name,
    manifests: [
      {
        name,
        path: name,
        yaml,
        kind: "Job",
        resourceName: name,
        namespace: JOB_NAMESPACE,
      },
    ],
  }
}

export function waitArgv(name: string, forWhat: string, waited: string): readonly string[] {
  return ["wait", "-n", JOB_NAMESPACE, `job/${name}`, `--for=${forWhat}`, `--timeout=${waited}`]
}

export function logsArgv(name: string): readonly string[] {
  return ["logs", "-n", JOB_NAMESPACE, `job/${name}`, EVERY_LINE]
}

const ranBy: Running = (argv, text) => (text === null ? runKubectl(argv) : runKubectlOn(argv, text))

export type Recalling = (root: string, subject: string) => Promise<string | null>

const recalledBy: Recalling = async (root, subject) => {
  const read = kindNamed(root, subject)
  return "refused" in read ? null : await commitRecordedIn(read.pagePath)
}

export type Fate = "complete" | "failed" | "running"

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

export async function ranInCluster(
  given: string | Reading,
  root: string,
  subject: string,
  commit: string,
  recalling: Recalling = recalledBy,
  running: Running = ranBy,
  carrying: Carrying = carriedByOrigin,
  pushing: Pushing = pushBranch
): Promise<Ended> {
  const carried = carrying(root, commit)
  if ("why" in carried) return carried
  if (!carried.carried) {
    const pushed = pushing(root)
    if (pushed.failed) {
      return { why: `origin does not carry ${commit} and ${pushed.line}` }
    }
    const again = carrying(root, commit)
    if ("why" in again) return again
    if (!again.carried) {
      return { why: `origin does not carry ${commit}, so no job in the cluster can read it` }
    }
  }
  const name = jobNameFor(subject, commit)
  const yaml = jobYamlFor(given, subject, commit, await recalling(root, subject))
  const placing = placeSecrets(root, planFor(name, yaml))
  if (placing.unplaced.length > 0) {
    const short = placing.unplaced.map((one) => `${one.name}/${one.key}`).join(", ")
    return { why: `no secret page places ${short}, so the job would read no repository` }
  }
  const put = running(applyArgv(), yaml)
  if (put.code !== 0) {
    return { why: `the job ${name} would not go up: ${put.stderr.trim()}` }
  }
  const fate = fateOf(running, name, WAITED_ROUNDS)
  return endedBy(fate, running(logsArgv(name), null), name)
}
