import { plain, ranOver } from "akasha/code/running/modules/code-tests/code-tests.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { within } from "akasha/command/argument/pages/within.argument.ts"
import {
  asJson,
  INPUT,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { temperBuildTest as page } from "akasha/command/pages/temper/build-test/temper-build-test.command.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const NAMED = [within, json]

const BUILDS = "temper/player/character"

type FileRun = { readonly path: string; readonly passed: boolean; readonly output: string }

function insideBuilds(folder: string): boolean {
  const trimmed = folder.replace(/\/+$/, "")
  return trimmed === BUILDS || trimmed.startsWith(`${BUILDS}/`)
}

function linesOf(runs: readonly FileRun[]): readonly string[] {
  const failed = runs.filter((one) => !one.passed)
  const lines = [`${String(runs.length)} test files ran, ${String(failed.length)} failed`]
  for (const one of failed) {
    lines.push("", `failed: ${one.path}`)
    for (const line of plain(one.output).split("\n"))
      if (line.trim() !== "") lines.push(`  ${line}`)
  }
  return lines
}

export async function temperBuildTest(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const folder = read.taken.within ?? BUILDS
  if (!insideBuilds(folder)) {
    return refused(`\`${folder}\` is outside \`${BUILDS}\`, where character builds are`, INPUT)
  }
  const ran = await ranOver(akashaRoot(), [folder], 0)
  const runs: FileRun[] = ran.spent.map((one) => ({
    path: one.path,
    passed: one.code === 0 && one.signal === null,
    output: one.out,
  }))
  if (runs.length === 0) return refused(`no test is under \`${folder}\``, INPUT)
  if (read.taken.json) return asJson({ within: folder, runs })
  return told(linesOf(runs))
}
