import { createRequire } from "node:module"
import { basename, dirname, join } from "node:path"
import { textOf } from "akasha/code-system/body-text/body-text.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { besideAt, partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"
import { shadowFor } from "akasha/pages/shadow/shadow.module.code.ts"
import type {
  Adding,
  Replacing,
} from "../../../changes/modules/answer/change-answer.module.types.ts"

const RECIPE = "container-recipe"

const GROUP = "composing.code"

const HOLDS = "ts"

const COMPOSES = "recipeIn"

const WRITTEN = "Containerfile"

const SLUG = "slug"

const loadFrom = createRequire(import.meta.url)

export type Composing = (given: string | Reading) => string

export type Reached = { readonly composing: Composing } | { readonly missing: string }

export type Reaching = (root: string, at: string) => Reached

export type Composed = {
  readonly edits: readonly (Adding | Replacing)[]
  readonly said: readonly string[]
}

const NOTHING_COMPOSED: Composed = { edits: [], said: [] }

export function composingAt(page: string): string | null {
  return besideAt(page, GROUP, HOLDS)
}

export function recipeAt(page: string): string {
  return join(dirname(page), WRITTEN)
}

export function composingIn(root: string, at: string): Reached {
  let held: Record<string, unknown>
  try {
    held = loadFrom(join(root, at)) as Record<string, unknown>
  } catch (thrown) {
    return { missing: thrown instanceof Error ? thrown.message : String(thrown) }
  }
  const named = held[COMPOSES]
  if (typeof named !== "function") return { missing: "it answers to no `" + COMPOSES + "`" }
  return { composing: named as Composing }
}

type Answered = { readonly written: string } | { readonly missing: string }

function writtenBy(composing: Composing, reading: Reading): Answered {
  try {
    return { written: composing(reading) }
  } catch (thrown) {
    return { missing: thrown instanceof Error ? thrown.message : String(thrown) }
  }
}

export function composedOver(
  change: Change,
  shadow: Shadow,
  reading: Reading,
  reaching: Reaching = composingIn
): Composed {
  const edits: (Adding | Replacing)[] = []
  const said: string[] = []
  for (const listed of shadow.index.everyOfType(RECIPE)) {
    const value = shadow.pageOf(listed.path)
    if (value === null) continue
    const slug = value[SLUG]
    if (typeof slug !== "string") continue
    const beside = composingAt(listed.path)
    if (beside === null) continue
    if (change.after(beside) === null) continue
    const at = shadow.codeAt(beside)
    if (at === null) continue
    const reached = reaching(change.root, at)
    if ("missing" in reached) {
      said.push(
        "`" +
          slug +
          "` keeps a composing group, and `" +
          beside +
          "` gave none — " +
          reached.missing
      )
      continue
    }
    const answered = writtenBy(reached.composing, reading)
    if ("missing" in answered) {
      said.push(
        "`" + slug + "` keeps a composing group, and `" + beside + "` broke — " + answered.missing
      )
      continue
    }
    const path = recipeAt(listed.path)
    const was = textOf(change.after(path))
    if (was === answered.written) continue
    edits.push(
      was === null
        ? { kind: "add", path, content: answered.written }
        : { kind: "replace", path, contentFrom: was, contentTo: answered.written }
    )
    said.push("`" + path + "` was written again by the group `" + slug + "` keeps")
  }
  return { edits, said }
}

export function couldCompose(change: Change): boolean {
  for (const path of change.changed) {
    if (basename(path) === WRITTEN) return true
    if (partedIn(path) !== null) return true
  }
  return false
}

export function recipesFor(change: Change): Composed {
  try {
    if (!couldCompose(change)) return NOTHING_COMPOSED
    const cast = shadowFor(change)
    if ("refused" in cast) return NOTHING_COMPOSED
    return composedOver(change, cast.shadow, cast.reading)
  } catch (thrown) {
    return {
      edits: [],
      said: [
        "no recipe was composed again — " +
          (thrown instanceof Error ? thrown.message : String(thrown)),
      ],
    }
  }
}
