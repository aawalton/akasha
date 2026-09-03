import type { Answer } from "@akasha/command-system/calling"
import { inputIn } from "@akasha/command-system/piping"
import { renderResult } from "@akasha/test-fanout/triage-fanout-render"
import { analyzeFanoutLog, decideTriageExit, normalizeLogInput } from "@tools/lib/triage-fanout-log"

const NOTHING_PIPED =
  "this reads the fan-out pod log from standard input, and nothing was piped in. " +
  "Pipe the WHOLE log, as in `akasha pipeline-logs --seq <n> --workflow checks " +
  "--step check-unit-tests --all | akasha tests-triage-fanout`"

const A_TERMINAL =
  "this reads the fan-out pod log from standard input, and standard input is a terminal"

const COULD_NOT_TELL = 3

const SAW_FAILURE = 1

export function refusedBy(said: string): Answer {
  return { report: [], refusals: [said], code: 1 }
}

export function codeOf(said: 0 | 1 | 2): number {
  if (said === 0) return 0
  return said === 1 ? SAW_FAILURE : COULD_NOT_TELL
}

export function bodyOf(
  held: ReturnType<typeof inputIn>
): { readonly body: string } | { readonly why: string } {
  if ("tty" in held) return { why: A_TERMINAL }
  if ("unreadable" in held) return { why: `standard input would not be read — ${held.unreadable}` }
  if (held.bytes.byteLength === 0) return { why: NOTHING_PIPED }
  return { body: new TextDecoder().decode(held.bytes) }
}

export function testsTriageFanout(argv: readonly string[]): Answer {
  const first = argv[0]
  if (first !== undefined) {
    return refusedBy(
      `\`${first}\` is not an argument this takes — it reads the log from standard input`
    )
  }

  const held = bodyOf(inputIn())
  if ("why" in held) return refusedBy(held.why)

  const lines = normalizeLogInput(held.body)
  if (lines.length === 0) return refusedBy(NOTHING_PIPED)

  const result = analyzeFanoutLog(lines, Date.now())
  const code = codeOf(decideTriageExit(result))
  const report = renderResult(result).split("\n")
  return { report, refusals: code === 0 ? [] : [result.reason], code }
}
