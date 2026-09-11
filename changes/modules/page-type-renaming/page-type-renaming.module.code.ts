import { basename, dirname, join } from "node:path"
import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { claimedIn } from "akasha/changes/modules/page-claiming/page-claiming.module.code.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { typeSlugIn } from "akasha/pages/file-name/page-file-name.module.code.ts"

const KEYS = ["type", "pageTypeSlug"]

export type Paged = { readonly at: string; readonly lands: string }

export type Moving =
  | { readonly moved: ReadonlyMap<string, string>; readonly paged: readonly Paged[] }
  | { readonly refused: string }

export function landedName(one: string, was: string, to: string, opening: boolean): string | null {
  const dir = dirname(one)
  const name = basename(one)
  if (opening) {
    if (!name.startsWith(`${was}.`)) return null
    return join(dir, `${to}.${name.slice(was.length + 1)}`)
  }
  const held = name.replace(`.${was}.`, `.${to}.`)
  return held === name ? null : join(dir, held)
}

function carriedInto(
  world: World,
  at: string,
  claimed: readonly string[],
  was: string,
  to: string,
  opening: boolean,
  moved: Map<string, string>
): Paged | string {
  let landed = at
  for (const one of claimed) {
    const lands = landedName(one, was, to, opening)
    if (lands === null) return `\`${one}\` names no \`${was}\`, so that file is carried nowhere`
    if (world.bodyOf(lands) !== null) return `\`${lands}\` is a body already`
    moved.set(one, lands)
    if (one === at) landed = lands
  }
  return { at, lands: landed }
}

export function pagesMoved(world: World, was: string, to: string): Moving {
  const moved = new Map<string, string>()
  const paged: Paged[] = []
  for (const [at, value] of world.index.valuesByPath(was)) {
    const held = carriedInto(world, at, claimedIn(world, at, value), was, to, false, moved)
    if (typeof held === "string") return { refused: held }
    paged.push(held)
  }
  return { moved, paged }
}

export function typeMoved(world: World, at: string, to: string): Moving {
  const was = typeSlugIn(at)
  if (was === null) return { refused: `\`${at}\` names no page type, so nothing is carried` }
  const value = world.index.pageByPath(at)
  if (value === null) return { refused: `\`${at}\` is filed as no page, so nothing is carried` }
  const moved = new Map<string, string>()
  const held = carriedInto(world, at, claimedIn(world, at, value), was, to, true, moved)
  if (typeof held === "string") return { refused: held }
  return { moved, paged: [held] }
}

export function keyedAnew(
  text: string,
  lands: string,
  was: string,
  to: string
): readonly FileChange[] {
  const said: FileChange[] = []
  for (const key of KEYS) {
    const held = `${key}: "${was}"`
    if (!text.includes(held)) continue
    said.push({ kind: "replace", path: lands, contentFrom: held, contentTo: `${key}: "${to}"` })
  }
  return said
}
