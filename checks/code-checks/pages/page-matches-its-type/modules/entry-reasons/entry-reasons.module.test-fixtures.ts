import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import type { Formatting } from "@akasha/pages/name-format/format-reaching"
import type { Carried } from "@akasha/pages/page-type-properties"
import { valueAt } from "@akasha/pages/page-value"
import { shadowAt } from "@akasha/pages/shadow"
import { rootOf } from "../../../../../../commands/modules/rooting/rooting.module.code.ts"
import { entryReasonsIn, type Shaping } from "./entry-reasons.module.code.ts"

const ALLOWS: Formatting = () => (): boolean => true

const REPO = rootOf(import.meta.path)

const RESTATEMENT = "agents/models/tests/pages/restatement/restatement.model-test.ts"

export const NO_ID = "keeps an entry of `cases` carrying no id, and every entry carries an id"

export const ID_LESS = '{"page":"a","definition":"b","statement":"c","answer":"YES"}\n'

const ANSWER: Carried = {
  pagePropertySlug: "case-answer",
  pageTypeSlug: "text-property",
  propertySlug: "answer",
  key: "answer",
  unique: null,
  declaredBy: "cases",
  required: true,
  many: false,
  maxCount: null,
  maxLength: null,
  uncommitted: false,
  secret: false,
}

export function shapingFor(): Shaping {
  return {
    fields: new Map([["answer", ANSWER]]),
    slug: "cases",
    pageFor: () => null,
    formatting: ALLOWS,
  }
}

const CASES = `${RESTATEMENT.slice(0, -3)}.cases`

function judged(beside: (at: string) => string | null): readonly string[] {
  const shadow = shadowAt(REPO)
  return entryReasonsIn(
    valueAt(RESTATEMENT, REPO) ?? {},
    shadow.index.propertiesOf("model-test"),
    shadow,
    RESTATEMENT,
    beside,
    ALLOWS
  )
}

export function entriesJudged(text: string | null): readonly string[] {
  return judged((at) => {
    if (text !== null) return at === `${CASES}.jsonl` ? text : null
    return existsSync(join(REPO, at)) ? readFileSync(join(REPO, at), "utf8") : null
  })
}

export function partsJudged(one: string, two: string): readonly string[] {
  const held = new Map([
    [`${CASES}.jsonl`, one],
    [`${CASES}.part2.jsonl`, two],
  ])
  return judged((at) => held.get(at) ?? null)
}
