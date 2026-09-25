import { approvedCallOf } from "akasha/agent/hook/agent-hook/block-combined-akasha-calls/block-combined-akasha-calls.agent-hook.code.ts"
import { handedIn } from "akasha/command/modules/lone-calling/lone-calling.module.code.ts"

export const OUTSIDE = "out"

export const INSIDE = "in"

const LONE = /^akasha(?: +(?:[^\s'"`$;|&<>()\\]+|'[^']*'))*$/

const OPENS_AKASHA = /^akasha\s/

export function runsOutside(line: string): boolean {
  const handed = handedIn(line)
  if (handed === null) return false
  const text = handed.trim()
  if (!OPENS_AKASHA.test(`${text} `)) return false
  return LONE.test(text) || approvedCallOf(text) !== null
}

if (import.meta.main) process.stdout.write(runsOutside(process.argv[2] ?? "") ? OUTSIDE : INSIDE)
