import { setAside } from "akasha/command/modules/stopping/command-stopping.module.code.ts"
import { deploy } from "akasha/command/pages/deploy/deploy.command.ts"
import { commitRecordedIn } from "akasha/command/pages/deploy/modules/commit-recording/deploy-commit-recording.module.code.ts"
import { kindNamed } from "akasha/command/pages/deploy/modules/kind-reading/deploy-kind-reading.module.code.ts"
import {
  type Ended,
  type Hearing,
  jobRan,
} from "akasha/infrastructure/job/modules/cluster-running/cluster-running.module.code.ts"
import {
  JUDGED,
  jobNameFor,
  jobsOf,
  jobYamlFor,
} from "akasha/infrastructure/job/modules/deploy-job/deploy-job.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"

export type Recalling = (root: string, subject: string) => Promise<string | null>

const recalledBy: Recalling = async (root, subject) => {
  const read = kindNamed(root, subject)
  return "refused" in read ? null : await commitRecordedIn(read.pagePath)
}

export function hearingFor(calledAs: string): Hearing {
  let counted: (() => undefined) | null = null
  return {
    started: () => {
      counted ??= setAside(deploy.maxWallSeconds, calledAs)
    },
    said: JUDGED,
    heard: () => {
      counted?.()
    },
  }
}

export type Putting = (
  root: string,
  commit: string,
  name: string,
  yaml: string,
  beside: RegExp,
  hearing: Hearing | null
) => Promise<Ended>

const putBy: Putting = async (root, commit, name, yaml, beside, hearing) =>
  await jobRan(
    root,
    commit,
    name,
    yaml,
    undefined,
    undefined,
    undefined,
    undefined,
    beside,
    hearing
  )

export async function ranInCluster(
  given: string | Reading,
  root: string,
  subject: string,
  commit: string,
  recalling: Recalling = recalledBy,
  putting: Putting = putBy,
  hearing: Hearing | null = hearingFor(`akasha ${deploy.name}`)
): Promise<Ended> {
  const name = jobNameFor(subject, commit)
  const yaml = jobYamlFor(given, subject, commit, await recalling(root, subject))
  hearing?.started()
  return await putting(root, commit, name, yaml, jobsOf(subject), hearing)
}
