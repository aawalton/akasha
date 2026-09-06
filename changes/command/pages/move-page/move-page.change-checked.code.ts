import { dirname, join, relative } from "node:path"
import { partedIn } from "@akasha/pages/page-file-name"
import type { Value } from "@akasha/pages/page-value"
import { importingOf } from "../../../../pages/indexes/path-naming/path-naming.module.code.ts"
import { importNotLeftHanging } from "../../../guards/pages/import-not-left-hanging/import-not-left-hanging.change-guard.code.ts"
import { answered, refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer, Edit } from "../../../modules/change-answer/change-answer.module.types.ts"
import { guardedBy } from "../../../modules/change-guarding/change-guarding.module.code.ts"
import type { World } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { claimedIn } from "../../../modules/page-claiming/page-claiming.module.code.ts"
import { repointed } from "../../../pages/repoint-imports/repoint-imports.change.code.ts"

const GUARDS = [importNotLeftHanging]

const OUTSIDE = ".."

export type MovePageAsked = {
  readonly at: string
  readonly to: string
}

type Moved = { readonly moved: ReadonlyMap<string, string> } | { readonly refused: string }

function pageIn(world: World, at: string): Value | null {
  const said = partedIn(at)
  if (said === null || said.sections.length > 0) return null
  return world.index.pageAt(said.pageType, said.slug)
}

// Each file keeps the place that file holds under the page's folder, so a file in a folder of its
// own arrives under a folder of the same name rather than beside the page.
function movedInto(world: World, at: string, to: string, beside: readonly string[]): Moved {
  const from = dirname(at)
  if (from === to) return { refused: `\`${to}\` is the folder the page already sits in` }
  const said = new Map<string, string>()
  for (const one of beside) {
    const held = relative(from, one)
    if (held.startsWith(OUTSIDE)) {
      return { refused: `\`${one}\` sits outside \`${from}\`, so the page is not carried` }
    }
    const next = join(to, held)
    if (world.textOf(next) !== null) return { refused: `\`${next}\` is a body already` }
    said.set(one, next)
  }
  return { moved: said }
}

export function movePage(world: World, given: MovePageAsked): Answer {
  const value = pageIn(world, given.at)
  if (value === null) return refusing(`\`${given.at}\` names no page, so no page is carried`)
  let beside: readonly string[]
  try {
    beside = claimedIn(world, given.at, value)
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return refusing(`${why}, so the files beside \`${given.at}\` were not worked out`)
  }
  const said = movedInto(world, given.at, given.to, beside)
  if ("refused" in said) return refusing(said.refused)
  const moved = said.moved
  const reading = importingOf(world.index, moved)
  if ("unread" in reading) return refusing(reading.unread)
  const edits: Edit[] = []
  for (const [one, next] of moved) {
    const text = world.textOf(one)
    if (text === null) return refusing(`\`${one}\` could not be read`)
    edits.push(...repointed(one, next, text, moved).edits)
  }
  for (const path of reading.importers) {
    if (moved.has(path)) continue
    const held = world.textOf(path)
    if (held === null) return refusing(`\`${path}\` names a path that moved and could not be read`)
    for (const one of repointed(path, path, held, moved).edits) {
      if (one.body !== held) edits.push(one)
    }
  }
  return guardedBy(world, answered(edits), GUARDS)
}

export function runChange(world: World, given: MovePageAsked): Answer {
  return movePage(world, given)
}
