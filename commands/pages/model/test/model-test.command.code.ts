import {
  type Got,
  type Judged,
  runningOf,
} from "akasha/agents/models/tests/running/model-test-running.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { broken as brokenArgument } from "akasha/commands/arguments/pages/broken.argument.ts"
import { cases } from "akasha/commands/arguments/pages/cases.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { modelTest as modelTestArgument } from "akasha/commands/arguments/pages/model-test.argument.ts"
import { show } from "akasha/commands/arguments/pages/show.argument.ts"
import {
  codeOf,
  DATA,
  OK,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { answeredWith } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { modelTest as page } from "akasha/commands/pages/model/test/model-test.command.ts"

const UNREACHED = "unreached"

const SAID = 40

export type Shown = {
  readonly json: boolean
  readonly broken: boolean
  readonly show: boolean
}

export function sayingOf(got: readonly Got[]): string {
  return got
    .map((one) => `${one.about}=${one.said.trim().replace(/\s+/g, " ").slice(0, SAID)}`)
    .join(" | ")
}

export function rowOf(judged: Judged): string {
  const kept = judged.kept ? "kept" : "broke"
  const got = judged.reached ? sayingOf(judged.got) : UNREACHED
  return [kept, judged.one.against ?? "", judged.one.answer, got, judged.one.statement].join("\t")
}

export function scoreOf(every: readonly Judged[]): string {
  return `kept\t${every.filter((one) => one.kept).length} of ${every.length}`
}

export function shownOf(judged: Judged): readonly string[] {
  const lines: string[] = [`${judged.kept ? "kept" : "broke"}\t${judged.one.id}`]
  for (let at = 0; at < judged.asked.length; at += 1) {
    const asked = judged.asked[at]
    if (asked === undefined) continue
    lines.push(`--- put about ${asked.about}`, asked.prompt)
    lines.push(`--- said about ${asked.about}`, judged.got[at]?.said ?? "")
  }
  if (judged.asked.length === 0) lines.push(`--- ${UNREACHED}`)
  return lines
}

function showing(every: readonly Judged[], on: Shown): Answer {
  const shown = on.broken ? every.filter((one) => !one.kept) : every
  const broken = every.filter((one) => !one.kept).length
  const code = broken === 0 ? OK : DATA
  if (on.json) {
    return answeredWith(
      [
        JSON.stringify({
          ok: broken === 0,
          kept: every.length - broken,
          of: every.length,
          cases: shown.map((one) => ({
            id: one.one.id,
            against: one.one.against ?? null,
            answer: one.one.answer,
            got: one.reached ? one.got : null,
            kept: one.kept,
            statement: one.one.statement,
          })),
        }),
      ],
      [],
      code
    )
  }
  if (on.show) return answeredWith([...shown.flatMap(shownOf), scoreOf(every)], [], code)
  return answeredWith([...shown.map(rowOf), scoreOf(every)], [], code)
}

export async function modelTest(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [
    json,
    modelTestArgument,
    cases,
    brokenArgument,
    show,
  ])
  if ("refused" in read) return refusedBy([...read.refused])
  const taken = read.taken
  const on: Shown = { json: taken.json, broken: taken.broken, show: taken.show }
  try {
    const every = await runningOf(given.root, taken.modelTest, taken.cases ?? taken.modelTest)
    return showing(every, on)
  } catch (thrown) {
    return refusedBy([whyOf(thrown)], codeOf(thrown))
  }
}
