import { measured } from "akasha/command/argument/pages/measured.argument.ts"
import { ref } from "akasha/command/argument/pages/ref.argument.ts"
import { deploy } from "akasha/command/pages/deploy/deploy.command.ts"
import {
  checkedOut,
  NAMED,
  jobYamlFor as yamlFor,
} from "akasha/infrastructure/job/modules/cluster-running/cluster-running.module.code.ts"
import { dispatcherIn } from "akasha/infrastructure/machine/provisioning/scripts/akasha-launcher/akasha-launcher.shell-script.scripting.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"

export function jobNameFor(subject: string, commit: string): string {
  return `${deploy.name}-${subject}-${commit.slice(0, NAMED)}`
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
  return yamlFor(jobNameFor(subject, commit), scriptFor(given, subject, commit, was))
}
