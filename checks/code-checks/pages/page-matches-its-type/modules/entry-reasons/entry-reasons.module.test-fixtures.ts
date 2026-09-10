import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import type { Formatting } from "akasha/pages/name-formats/modules/format-reaching/format-reaching.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"
import type { Carried } from "akasha/pages/types/declared-properties/declared-properties.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"
import { rootOf } from "../../../../../../commands/modules/rooting/rooting.module.code.ts"
import { entryReasonsIn, groupedFor, type Shaping } from "./entry-reasons.module.code.ts"

const allows: Formatting = () => (): boolean => true

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

const GROUP: Carried = {
  pagePropertySlug: "check",
  pageTypeSlug: "module-property-group",
  propertySlug: "check",
  key: "check",
  unique: null,
  declaredBy: "code-check",
  required: false,
  many: false,
  maxCount: null,
  maxLength: null,
  uncommitted: false,
  secret: false,
}

export function groupFieldsFor(held: unknown): readonly string[] {
  return [...groupedFor(GROUP, held, shadowAt(REPO)).keys()].sort()
}

export function shapingFor(): Shaping {
  return {
    fields: new Map([["answer", ANSWER]]),
    slug: "cases",
    pageFor: () => null,
    formatting: allows,
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
    allows
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
