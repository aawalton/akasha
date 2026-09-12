import type { Adding, Replacing } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { bodyFor, type Held, heldOver } from "akasha/code/body-loading/body-loading.module.code.ts"
import { textOf } from "akasha/code/body-text/body-text.module.code.ts"
import { formattedBody } from "akasha/code/format/code-format.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { readingIn, valuesOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"
import { shadowFor } from "akasha/pages/shadow/shadow.module.code.ts"

const BYTES = new TextEncoder()

const PAGE_TYPE = "page-type"

const HOLDS = "ts"

const SLUG = "slug"

const GENERATOR = "type-generator"

const GENERATOR_AT = "typeGenerator"

const GENERATES = "generateTypes"

const TURNS = "couldTurn"

export type Generating = (root: string, shadow: Shadow, change: Change) => readonly Adding[]

export type Turning = (change: Change) => boolean

export type Reached =
  | { readonly generating: Generating; readonly turning?: Turning }
  | { readonly missing: string }

export type Reaching = (root: string, at: string, body: string | null) => Reached

export type Typed = {
  readonly edits: readonly (Adding | Replacing)[]
  readonly said: readonly string[]
}

const NOTHING_TYPED: Typed = { edits: [], said: [] }

export function generatorAt(pageTypePath: string): string | null {
  return besideAt(pageTypePath, GENERATOR, HOLDS)
}

function generatingIn(root: string, at: string, body: string | null = null): Reached {
  let held: Held
  try {
    held = heldOver(root, at, body)
  } catch (thrown) {
    return { missing: thrown instanceof Error ? thrown.message : String(thrown) }
  }
  const named = held[GENERATES]
  if (typeof named !== "function") return { missing: `it answers to no \`${GENERATES}\`` }
  const said = held[TURNS]
  if (typeof said !== "function") return { generating: named as Generating }
  return { generating: named as Generating, turning: said as Turning }
}

type Answered = { readonly written: readonly Adding[] } | { readonly missing: string }

function writtenBy(generating: Generating, change: Change, shadow: Shadow): Answered {
  try {
    return { written: generating(change.root, shadow, change) }
  } catch (thrown) {
    return { missing: thrown instanceof Error ? thrown.message : String(thrown) }
  }
}

export function typedOver(
  change: Change,
  shadow: Shadow,
  reaching: Reaching = generatingIn
): Typed {
  const edits: (Adding | Replacing)[] = []
  const said: string[] = []
  const decoder = new TextDecoder()
  for (const listed of shadow.index.everyOfType(PAGE_TYPE)) {
    const value = shadow.pageOf(listed.path)
    if (value === null) continue
    const slug = value[SLUG]
    if (typeof slug !== "string") continue
    if (value[GENERATOR_AT] !== HOLDS) continue
    const beside = generatorAt(listed.path)
    if (beside === null) continue
    const at = shadow.codeAt(beside)
    if (at === null) {
      said.push(`\`${slug}\` states a type generator, and \`${beside}\` is at no path to load`)
      continue
    }
    const reached = reaching(change.root, at, bodyFor(change, beside))
    if ("missing" in reached) {
      said.push(
        `\`${slug}\` states a type generator, and \`${beside}\` gave none — ${reached.missing}`
      )
      continue
    }
    if (reached.turning !== undefined && !reached.turning(change)) continue
    const answered = writtenBy(reached.generating, change, shadow)
    if ("missing" in answered) {
      said.push(
        `\`${slug}\` states a type generator, and \`${beside}\` broke — ${answered.missing}`
      )
      continue
    }
    for (const one of answered.written) {
      const body = BYTES.encode(one.content)
      const now = decoder.decode(formattedBody(change.root, one.path, body).body)
      const was = textOf(change.after(one.path))
      if (was === now) continue
      edits.push(
        was === null
          ? { kind: "add", path: one.path, content: now }
          : { kind: "replace", path: one.path, contentFrom: was, contentTo: now }
      )
      said.push(`\`${one.path}\` was written again by the generator \`${slug}\` states`)
    }
  }
  return { edits, said }
}

function askedOf(change: Change, reaching: Reaching, path: string): boolean {
  const beside = generatorAt(path)
  if (beside === null) return false
  const reached = reaching(change.root, beside, bodyFor(change, beside))
  if ("missing" in reached) return true
  const turning = reached.turning
  return turning === undefined || turning(change)
}

export function turnsFor(change: Change, reaching: Reaching = generatingIn): boolean {
  for (const one of valuesOfType(readingIn(change.root), PAGE_TYPE)) {
    if (one.value[GENERATOR_AT] !== HOLDS) continue
    if (askedOf(change, reaching, one.path)) return true
  }
  return false
}

export function typesFor(change: Change): Typed {
  try {
    if (!turnsFor(change)) return NOTHING_TYPED
    const cast = shadowFor(change)
    if ("refused" in cast) return NOTHING_TYPED
    return typedOver(change, cast.shadow)
  } catch (thrown) {
    return {
      edits: [],
      said: [
        `no type was written again — ${thrown instanceof Error ? thrown.message : String(thrown)}`,
      ],
    }
  }
}
