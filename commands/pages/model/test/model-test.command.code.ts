import {
  type Got,
  type Judged,
  runningOf,
} from "akasha/agents/models/tests/running/model-test-running.module.code.ts"
import {
  codeOf,
  DATA,
  OK,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { answeredWith } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"

export const CASES = "--cases"

export const BROKEN = "--broken"

export const JSON_OUT = "--json"

export const SHOW = "--show"

const UNREACHED = "unreached"

const SAID = 40

export type Read =
  | {
      readonly test: string
      readonly from: string | null
      readonly on: ReadonlySet<string>
    }
  | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  const on = new Set<string>()
  let test: string | null = null
  let from: string | null = null
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (one === CASES) {
      const said = argv[at + 1]
      if (said === undefined || said.startsWith("-")) {
        refusals.push(`\`${CASES}\` takes the test whose cases are used, and none was named`)
        return { refused: refusals }
      }
      from = said
      at += 1
      continue
    }
    if (one === BROKEN || one === JSON_OUT || one === SHOW) {
      on.add(one)
      continue
    }
    if (one.startsWith("-")) {
      refusals.push(
        `\`${one}\` is no flag a run takes — it takes ${CASES}, ${BROKEN}, ${JSON_OUT}, ${SHOW}`
      )
      continue
    }
    if (test !== null) {
      refusals.push(`\`${one}\` is a second test, and a run scores one test`)
      continue
    }
    test = one
  }
  if (test === null) refusals.push("a run takes the test to score, and none was named")
  if (refusals.length > 0 || test === null) return { refused: refusals }
  return { test, from, on }
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

function showing(every: readonly Judged[], on: ReadonlySet<string>): Answer {
  const shown = on.has(BROKEN) ? every.filter((one) => !one.kept) : every
  const broken = every.filter((one) => !one.kept).length
  const code = broken === 0 ? OK : DATA
  if (on.has(JSON_OUT)) {
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
  if (on.has(SHOW)) return answeredWith([...shown.flatMap(shownOf), scoreOf(every)], [], code)
  return answeredWith([...shown.map(rowOf), scoreOf(every)], [], code)
}

export async function modelTest(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  try {
    return showing(await runningOf(given.root, read.test, read.from ?? read.test), read.on)
  } catch (thrown) {
    return refusedBy([whyOf(thrown)], codeOf(thrown))
  }
}
