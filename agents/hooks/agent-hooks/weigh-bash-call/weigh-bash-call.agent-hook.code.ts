import type { Answer } from "akasha/agents/hooks/answer/hook-answer.module.code.ts"
import { LET_THROUGH, said } from "akasha/agents/hooks/answer/hook-answer.module.code.ts"

export function answerFor(): Answer {
  return LET_THROUGH
}

async function ran(): Promise<number> {
  await Bun.stdin.text()
  return said(answerFor())
}

if (import.meta.main) process.exit(await ran())
