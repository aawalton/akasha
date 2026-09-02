import type { Asking } from "../../../readout-asking/readout-asking.module.code.ts"

const QUESTION = "question"

const STATUS = "status"

const OPEN = "open"

const SLUG = "slug"

const OPEN_UNKNOWN =
  "the questions could not be read, so how many are open is unknown rather than none"

export function questionsOpen(): Readonly<Record<string, unknown>> {
  return {
    "page-type": QUESTION,
    where: { [STATUS]: { is: OPEN } },
    keys: [SLUG],
  }
}

export async function fetchOpenQuestions(ask: Asking): Promise<number> {
  const asked = await ask(questionsOpen())
  if (!asked.ok) throw new Error(`${OPEN_UNKNOWN}: ${asked.why}`)
  return asked.rows.length
}
