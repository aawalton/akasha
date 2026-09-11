import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import {
  entryReasonsIn,
  groupedFor,
  NOTHING_OPENED,
  openedAmong,
  type Shaping,
} from "akasha/checks/code-checks/pages/page-matches-its-type/modules/entry-reasons/entry-reasons.module.code.ts"
import { allows } from "akasha/checks/code-checks/pages/page-matches-its-type/page-matches-its-type.code-check.decision.test-fixtures.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { shadowAt } from "akasha/pages/shadow/shadow.module.code.ts"
import type { Carried } from "akasha/pages/types/declared-properties/declared-properties.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"

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

const TAG: Carried = {
  pagePropertySlug: "tag",
  pageTypeSlug: "text-property",
  propertySlug: "tag",
  key: "tag",
  unique: null,
  declaredBy: "step",
  required: false,
  many: false,
  maxCount: null,
  maxLength: 4,
  uncommitted: false,
  secret: false,
}

const STEP: Carried = {
  pagePropertySlug: "step",
  pageTypeSlug: "record-property",
  propertySlug: "step",
  key: "step",
  unique: null,
  declaredBy: "cases",
  required: false,
  many: false,
  maxCount: null,
  maxLength: null,
  uncommitted: false,
  secret: false,
}

const WITHIN: ReadonlyMap<string, Carried> = new Map([["tag", TAG]])

export function shapingFor(): Shaping {
  return {
    fields: new Map([["answer", ANSWER]]),
    slug: "cases",
    pageFor: () => null,
    formatting: allows,
    fieldsIn: () => NOTHING_OPENED,
  }
}

export function nestedShapingFor(): Shaping {
  return {
    fields: new Map([
      ["answer", ANSWER],
      ["step", STEP],
    ]),
    slug: "cases",
    pageFor: () => null,
    formatting: allows,
    fieldsIn: (one) =>
      one.key === "step" ? { among: [], fields: WITHIN, plain: false } : NOTHING_OPENED,
  }
}

export function oneOfShapingFor(): Shaping {
  return {
    fields: new Map([
      ["answer", ANSWER],
      ["step", STEP],
    ]),
    slug: "cases",
    pageFor: () => null,
    formatting: allows,
    fieldsIn: (one) =>
      one.key === "step" ? { among: [], fields: WITHIN, plain: true } : NOTHING_OPENED,
  }
}

const KIND: Carried = { ...TAG, key: "kind", maxLength: null, propertySlug: "kind", required: true }

const COUNT: Carried = {
  ...TAG,
  key: "count",
  maxLength: null,
  propertySlug: "count",
  required: true,
}

const ONE_ARM: ReadonlyMap<string, Carried> = new Map([
  ["kind", KIND],
  ["tag", { ...TAG, required: true }],
])

const TWO_ARM: ReadonlyMap<string, Carried> = new Map([
  ["kind", KIND],
  ["count", COUNT],
])

export function amongShapingFor(): Shaping {
  return {
    fields: new Map([
      ["answer", ANSWER],
      ["step", STEP],
    ]),
    slug: "cases",
    pageFor: () => null,
    formatting: allows,
    fieldsIn: (one) =>
      one.key === "step"
        ? { among: [ONE_ARM, TWO_ARM], fields: new Map(), plain: false }
        : NOTHING_OPENED,
  }
}

export function openedFor(members: readonly string[]): readonly [readonly string[], boolean] {
  const opened = openedAmong({ members: [...members] }, shadowAt(REPO))
  return [[...opened.fields.keys()].sort(), opened.plain]
}

export function amongFor(members: readonly string[]): readonly (readonly string[])[] {
  const opened = openedAmong({ members: [...members] }, shadowAt(REPO))
  return opened.among.map((fields) => [...fields.keys()].sort())
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

function partsHeld(one: string, two: string): ReadonlyMap<string, string> {
  return new Map([
    [`${CASES}.jsonl`, one],
    [`${CASES}.part2.jsonl`, two],
  ])
}

export function partsJudged(one: string, two: string): readonly string[] {
  const held = partsHeld(one, two)
  return judged((at) => held.get(at) ?? null)
}

export function secondPartReads(one: string, two: string): number {
  const held = partsHeld(one, two)
  let reads = 0
  judged((at) => {
    if (at === `${CASES}.part2.jsonl`) reads += 1
    return held.get(at) ?? null
  })
  return reads
}
