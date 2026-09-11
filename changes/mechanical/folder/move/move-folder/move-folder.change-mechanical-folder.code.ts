import { dirname, join, relative } from "node:path"
import { renameManifestWays } from "akasha/changes/mechanical/file-content/change/change-manifest-ways/change-manifest-ways.change-mechanical-file-content.code.ts"
import { runChange as changeImports } from "akasha/changes/mechanical/file-content/rename/change-imports/change-imports.change-mechanical-file-content.code.ts"
import {
  refusing,
  replayed,
  stating,
} from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type {
  Answer,
  FileChange,
} from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { reachesIn } from "akasha/code/package-manifest/package-manifest.module.code.ts"
import { manifestsIn } from "akasha/pages/indexes/package-reaching/package-reaching.module.code.ts"
import { spellersIn } from "akasha/pages/indexes/path-naming/path-naming.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

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

type Text = (path: string) => string | null

function waysNaming(textAt: Text, at: string, moved: ReadonlyMap<string, string>): boolean {
  const held = textAt(at)
  if (held === null) return false
  for (const one of reachesIn(dirname(at), held).values()) {
    if (moved.has(one)) return true
  }
  return false
}

function textOver(world: World, edits: readonly FileChange[]): Text | string {
  const held = replayed(stating(edits), world.bodyOf)
  if ("refused" in held) return held.refused
  return (path) => {
    if (!held.has(path)) return world.textOf(path)
    const one = held.get(path) ?? null
    return typeof one === "string" ? one : null
  }
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
  const ways = Object.fromEntries(moved)
  const manifests = manifestsIn(world.index.everyPath(), world.index.fileKeysAt())
  const edits: FileChange[] = []
  for (const [one, next] of moved) {
    edits.push({ kind: "move", pathFrom: one, pathTo: next })
    const answer = changeImports(world, { was: one, now: next, carried })
    if (answer.refused !== null) return answer
    edits.push(...answer.edits)
  }
  const folder = new Map([[given.from, given.to]])
  const known = new Set(moved.keys())
  for (const path of spellersIn(world.index.everyPath(), searchable(world), folder, known)) {
    const answer = changeImports(world, { was: path, now: path, carried })
    if (answer.refused !== null) return answer
    edits.push(...answer.edits)
  }
  const textAt = textOver(world, edits)
  if (typeof textAt === "string") return refusing(textAt)
  for (const at of manifests) {
    if (moved.has(at) || !waysNaming(textAt, at, moved)) continue
    const answer = renameManifestWays({ at, moved: ways }, textAt)
    if (answer.refused !== null) return answer
    edits.push(...answer.edits)
  }
  return stating(edits)
}
