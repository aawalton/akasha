import { approvedCallOf } from "akasha/agent/hook/agent-hook/block-combined-akasha-calls/block-combined-akasha-calls.agent-hook.code.ts"
import { firstCapture } from "akasha/code/type/narrowing/modules/first-capture/first-capture.module.code.ts"
import { handedIn } from "akasha/command/modules/lone-calling/lone-calling.module.code.ts"

export const OUTSIDE = "out"

export const INSIDE = "in"

const LONE = /^akasha(?: +(?:[^\s'"`$;|&<>()\\]|'[^']*'|"(?:[^"`$\\]|\\[\s\S])*")+)*$/

const HEREDOC_OPENED = / <<'([A-Za-z_][\w-]*)'$/

const OPENS_AKASHA = /^akasha\s/

function loneFed(text: string): boolean {
  const [first = "", ...body] = text.split("\n")
  const opened = HEREDOC_OPENED.exec(first)
  const fence = firstCapture(opened)
  if (opened === null || fence === null) return false
  if (!LONE.test(first.slice(0, opened.index))) return false
  return body.length > 0 && body.indexOf(fence) === body.length - 1
}

export function runsOutside(line: string): boolean {
  const handed = handedIn(line)
  if (handed === null) return false
  const text = handed.trim()
  if (!OPENS_AKASHA.test(`${text} `)) return false
  return LONE.test(text) || loneFed(text) || approvedCallOf(text) !== null
}

if (import.meta.main) process.stdout.write(runsOutside(process.argv[2] ?? "") ? OUTSIDE : INSIDE)
