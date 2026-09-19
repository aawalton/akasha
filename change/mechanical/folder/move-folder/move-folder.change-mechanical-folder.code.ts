import { join, relative } from "node:path"
import {
  type Answer,
  type FileChange,
  refusing,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { repointed } from "akasha/change/modules/import-repointing/import-repointing.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  EVERY_KIND,
  pathsNaming,
} from "akasha/change/modules/tree-searching/tree-searching.module.code.ts"
import {
  namesFor,
  spellersIn,
} from "akasha/page/index/modules/path-naming/path-naming.module.code.ts"
import {
  type Facing,
  facingOn,
  generatedIn,
} from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"
import { quotedIn } from "akasha/page/index/modules/quote-holding/quote-holding.module.code.ts"
import { namesDrawn } from "akasha/text/writing/modules/name-drawing/name-drawing.module.code.ts"

const OUTSIDE = ".."

export type Asked = {
  readonly from: string
  readonly to: string
}

type Moved = { readonly moved: ReadonlyMap<string, string> } | { readonly refused: string }

function underneath(world: World, at: string): readonly string[] {
  return [...world.under(at)].sort()
}

function missing(world: World, at: string, under: readonly string[]): readonly string[] {
  const tracked = world.tracked?.(at) ?? null
  if (tracked === null) return []
  const listed = new Set(under)
  return [...tracked].filter((one) => !listed.has(one)).sort()
}

function movedInto(world: World, at: string, to: string, under: readonly string[]): Moved {
  const held = new Set(world.under(to))
  const said = new Map<string, string>()
  for (const one of under) {
    const next = join(to, relative(at, one))
    if (held.has(next)) return { refused: `\`${next}\` is a body already` }
    said.set(one, next)
  }
  return { moved: said }
}

function searchable(world: World): (path: string) => string | null {
  return (path) => {
    try {
      return world.textOf(path)
    } catch {
      return null
    }
  }
}

function namingFolder(
  world: World,
  facing: Facing,
  folder: ReadonlyMap<string, string>,
  known: ReadonlySet<string>
): readonly string[] | string {
  let found: readonly string[]
  try {
    found = pathsNaming(world, namesFor(folder), EVERY_KIND)
  } catch (cause) {
    const held = cause instanceof Error ? cause.message : String(cause)
    return `${held}, so no folder was carried`
  }
  const said = found.filter((path) => !quotedIn(facing, path))
  return spellersIn(said, searchable(world), folder, known)
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  if (given.from === given.to) {
    return refusing(`\`${given.to}\` is the folder those files sit under`)
  }
  const left = world.unentered?.(given.from) ?? []
  if (left.length > 0) {
    const named = namesDrawn(left)
    const holds = left.length === 1 ? "holds" : "hold"
    return refusing(
      `${named} ${holds} a file no move carries, so \`${given.from}\` is left holding it` +
        ` — take it away before the move`
    )
  }
  const under = underneath(world, given.from)
  if (under.length === 0) {
    return refusing(`\`${given.from}\` holds no file, so nothing is carried`)
  }
  if (!relative(given.from, given.to).startsWith(OUTSIDE)) {
    return refusing(`\`${given.to}\` sits under \`${given.from}\`, so the folder is not carried`)
  }
  const missed = missing(world, given.from, under)
  if (missed.length > 0) {
    const named = namesDrawn(missed)
    const names = missed.length === 1 ? "names a file" : "names files"
    return refusing(
      `git ${names} under \`${given.from}\` the listing does not, so the move would leave` +
        ` ${missed.length === 1 ? "it" : "them"} behind: ${named}`
    )
  }
  const said = movedInto(world, given.from, given.to, under)
  if ("refused" in said) return refusing(said.refused)
  const moved = said.moved
  const carried = { from: given.from, to: given.to }
  const facing = facingOn(world.root)
  const edits: FileChange[] = []
  for (const [one, next] of moved) {
    edits.push({ kind: "move", pathFrom: one, pathTo: next })
    if (generatedIn(facing, one)) continue
    const answer = repointed(world, { was: one, now: next, carried })
    if (answer.refused !== null) return answer
    edits.push(...answer.edits)
  }
  const folder = new Map([[given.from, given.to]])
  const known = new Set(moved.keys())
  const spellers = namingFolder(world, facing, folder, known)
  if (typeof spellers === "string") return refusing(spellers)
  for (const path of spellers) {
    const answer = repointed(world, { was: path, now: path, carried })
    if (answer.refused !== null) return answer
    edits.push(...answer.edits)
  }
  return stating(edits)
}
