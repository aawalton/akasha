import { createRequire } from "node:module"
import { join } from "node:path"
import { textOf } from "@akasha/code/body-text"
import { formattedBody } from "@akasha/code/code-format"
import type { Change } from "@akasha/pages/change"
import { besideAt, partedIn } from "@akasha/pages/page-file-name"
import type { Shadow } from "@akasha/pages/shadow"
import { shadowFor } from "@akasha/pages/shadow"
import type {
  Adding,
  Replacing,
} from "../../../changes/modules/answer/change-answer.module.types.ts"
import type { FileEdit } from "../landing/landing.module.code.ts"

const PAGE_TYPE = "page-type"

const HOLDS = "ts"

const SLUG = "slug"

const GENERATOR = "type-generator"

const GENERATOR_AT = "typeGenerator"

const TYPES = "types"

const GENERATES = "generateTypes"

const loadFrom = createRequire(import.meta.url)

export type Generating = (root: string, shadow: Shadow) => readonly FileEdit[]

export type Reached = { readonly generating: Generating } | { readonly missing: string }

export type Reaching = (root: string, at: string) => Reached

export type Typed = {
  readonly edits: readonly (Adding | Replacing)[]
  readonly said: readonly string[]
}

const NOTHING_TYPED: Typed = { edits: [], said: [] }

export function generatorAt(pageTypePath: string): string | null {
  return besideAt(pageTypePath, GENERATOR, HOLDS)
}

export function generatingIn(root: string, at: string): Reached {
  let held: Record<string, unknown>
  try {
    held = loadFrom(join(root, at)) as Record<string, unknown>
  } catch (thrown) {
    return { missing: thrown instanceof Error ? thrown.message : String(thrown) }
  }
  const named = held[GENERATES]
  if (typeof named !== "function") return { missing: `it answers to no \`${GENERATES}\`` }
  return { generating: named as Generating }
}

type Answered = { readonly written: readonly FileEdit[] } | { readonly missing: string }

function writtenBy(generating: Generating, root: string, shadow: Shadow): Answered {
  try {
    return { written: generating(root, shadow) }
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
    const reached = reaching(change.root, at)
    if ("missing" in reached) {
      said.push(
        `\`${slug}\` states a type generator, and \`${beside}\` gave none — ${reached.missing}`
      )
      continue
    }
    const answered = writtenBy(reached.generating, change.root, shadow)
    if ("missing" in answered) {
      said.push(
        `\`${slug}\` states a type generator, and \`${beside}\` broke — ${answered.missing}`
      )
      continue
    }
    for (const one of answered.written) {
      if (one.body === null) continue
      const now = decoder.decode(formattedBody(change.root, one.path, one.body).body)
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

export function couldTurn(change: Change): boolean {
  for (const path of change.changed) {
    const said = partedIn(path)
    if (said === null || said.held !== HOLDS) continue
    if (said.sections.includes(GENERATOR)) return true
    if (said.sections.includes(TYPES)) return true
    if (said.sections.length > 0) continue
    if (said.pageType === PAGE_TYPE) return true
  }
  return false
}

export function typesFor(change: Change): Typed {
  try {
    if (!couldTurn(change)) return NOTHING_TYPED
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
