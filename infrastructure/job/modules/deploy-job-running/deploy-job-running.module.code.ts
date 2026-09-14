import {
  JOB_NAMESPACE,
  jobNameFor,
  jobYamlFor,
} from "akasha/infrastructure/job/modules/deploy-job/deploy-job.module.code.ts"
import {
  type Carried,
  carriedByOrigin,
} from "akasha/infrastructure/services/clusters/modules/web-app-building/web-app-building.module.code.ts"
import {
  type Ran,
  runKubectl,
  runKubectlOn,
} from "akasha/infrastructure/services/clusters/modules/workload-deploying/workload-deploying.module.code.ts"
import type { Reading } from "akasha/pages/indexes/modules/shape/index-shape.module.code.ts"

const WAITED = "30m"

const AT_ONCE = "1s"

const COMPLETE = "condition=Complete"

const FAILED = "condition=Failed"

const EVERY_LINE = "--tail=-1"

export type Running = (argv: readonly string[], text: string | null) => Ran

export type Carrying = (root: string, commit: string) => Carried

export type Ended = { readonly said: readonly string[] } | { readonly why: string }

export function applyArgv(): readonly string[] {
  return ["apply", "-f", "-"]
}

export function waitArgv(name: string, forWhat: string, waited: string): readonly string[] {
  return ["wait", "-n", JOB_NAMESPACE, `job/${name}`, `--for=${forWhat}`, `--timeout=${waited}`]
}

export function logsArgv(name: string): readonly string[] {
  return ["logs", "-n", JOB_NAMESPACE, `job/${name}`, EVERY_LINE]
}

export const ranBy: Running = (argv, text) =>
  text === null ? runKubectl(argv) : runKubectlOn(argv, text)

export function endedBy(waited: Ran, failed: Ran, lines: Ran, name: string): Ended {
  const said = lines.stdout.trim() === "" ? [] : lines.stdout.trim().split("\n")
  if (waited.code === 0) return { said }
  if (failed.code === 0) {
    return { why: [`the job ${name} failed`, ...said].join("\n") }
  }
  return { why: `the job ${name} had not ended after ${WAITED}: ${waited.stderr.trim()}` }
}

export function ranInCluster(
  given: string | Reading,
  root: string,
  subject: string,
  commit: string,
  running: Running = ranBy,
  carrying: Carrying = carriedByOrigin
): Ended {
  const carried = carrying(root, commit)
  if ("why" in carried) return carried
  if (!carried.carried) {
    return { why: `origin does not carry ${commit}, so no job in the cluster can read it` }
  }
  const name = jobNameFor(subject, commit)
  const put = running(applyArgv(), jobYamlFor(given, subject, commit))
  if (put.code !== 0) {
    return { why: `the job ${name} would not go up: ${put.stderr.trim()}` }
  }
  const waited = running(waitArgv(name, COMPLETE, WAITED), null)
  const failed = waited.code === 0 ? waited : running(waitArgv(name, FAILED, AT_ONCE), null)
  return endedBy(waited, failed, running(logsArgv(name), null), name)
}
