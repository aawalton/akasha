import { guessItFirst as test } from "./guess-it-first.model-test.ts"

export function guessItFirst(statement: string): string {
  return `${test.prompt}\n\n${statement}`
}
