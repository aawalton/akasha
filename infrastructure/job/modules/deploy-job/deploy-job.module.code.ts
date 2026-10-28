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

const HELD_AT_LEAST = "16Gi"

const BEGUN_BASE = 36

export function jobNameFor(subject: string, commit: string, at: number = Date.now()): string {
  const begun = Math.floor(at / 1000).toString(BEGUN_BASE)
  return `${deploy.name}-${subject}-${commit.slice(0, NAMED)}-${begun}`
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
  return new RegExp(`^${deploy.name}-${subject}-[0-9a-f]{${NAMED}}(-[0-9a-z]+)?$`)
}

export function scriptFor(
  given: string | Reading,
  subject: string,
  commit: string,
  was: string | null,
  handed = ""
): string {
  const run = `${deploy.name} ${subject} ${ref.said} ${commit} ${measured.said}`
  return [...checkedOut(commit, was), `${handed}bun ${dispatcherIn(given)} ${run}`].join("\n")
}

export function jobYamlFor(
  given: string | Reading,
  subject: string,
  commit: string,
  was: string | null,
  handed = "",
  named: string = jobNameFor(subject, commit)
): string {
  const script = scriptFor(given, subject, commit, was, handed)
  const account = deployAccount.slug
  return yamlFor(named, script, null, account, DEADLINE_SECONDS, deployCache.slug, HELD_AT_LEAST)
}
