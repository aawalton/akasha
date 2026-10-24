import { measured } from "akasha/command/argument/pages/measured.argument.ts"
import { ref } from "akasha/command/argument/pages/ref.argument.ts"
import { uncounted } from "akasha/command/modules/stopping/command-stopping.module.code.ts"
import { deploy } from "akasha/command/pages/deploy/deploy.command.ts"
import { deployAccount } from "akasha/infrastructure/job/deploy-account/deploy-account.manifest.ts"
import { deployCache } from "akasha/infrastructure/job/deploy-cache/deploy-cache.manifest.ts"
import {
  checkedOut,
  NAMED,
  jobYamlFor as yamlFor,
} from "akasha/infrastructure/job/modules/cluster-running/cluster-running.module.code.ts"
import { inCluster } from "akasha/infrastructure/job/modules/run-in-cluster/run-in-cluster.module.code.ts"
import { dispatcherIn } from "akasha/infrastructure/machine/provisioning/scripts/akasha-launcher/akasha-launcher.shell-script.scripting.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"

const DEADLINE_SECONDS = 900

export function jobNameFor(subject: string, commit: string): string {
  return `${deploy.name}-${subject}-${commit.slice(0, NAMED)}`
}

export const JUDGED = "judged"

function judgedLine(commit: string): string {
  return `${JUDGED}\t${commit}\n`
}

export async function judgedApart<T>(
  calledAs: string,
  commit: string,
  judging: () => Promise<T>
): Promise<T> {
  const judged = await uncounted(deploy.maxWallSeconds, calledAs, judging)
  if (inCluster()) process.stdout.write(judgedLine(commit))
  return judged
}

export function jobsOf(subject: string): RegExp {
  return new RegExp(`^${deploy.name}-${subject}-[0-9a-f]{${NAMED}}$`)
}

export function scriptFor(
  given: string | Reading,
  subject: string,
  commit: string,
  was: string | null
): string {
  return [
    ...checkedOut(commit, was),
    `bun ${dispatcherIn(given)} ${deploy.name} ${subject} ${ref.said} ${commit} ${measured.said}`,
  ].join("\n")
}

export function jobYamlFor(
  given: string | Reading,
  subject: string,
  commit: string,
  was: string | null
): string {
  const script = scriptFor(given, subject, commit, was)
  const named = jobNameFor(subject, commit)
  return yamlFor(named, script, null, deployAccount.slug, DEADLINE_SECONDS, deployCache.slug)
}
