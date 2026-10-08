import { commitRecordedIn } from "akasha/command/pages/deploy/modules/commit-recording/deploy-commit-recording.module.code.ts"
import { kindNamed } from "akasha/command/pages/deploy/modules/kind-reading/deploy-kind-reading.module.code.ts"
import {
  type Ended,
  jobRan,
} from "akasha/infrastructure/job/modules/cluster-running/cluster-running.module.code.ts"
import {
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

export type Putting = (
  root: string,
  commit: string,
  name: string,
  yaml: string,
  beside: RegExp
) => Promise<Ended>

const putBy: Putting = async (root, commit, name, yaml, beside) =>
  await jobRan(root, commit, name, yaml, undefined, undefined, undefined, undefined, beside)

export async function ranInCluster(
  given: string | Reading,
  root: string,
  subject: string,
  commit: string,
  recalling: Recalling = recalledBy,
  putting: Putting = putBy
): Promise<Ended> {
  const name = jobNameFor(subject, commit)
  const yaml = jobYamlFor(given, subject, commit, await recalling(root, subject))
  return await putting(root, commit, name, yaml, jobsOf(subject))
}
