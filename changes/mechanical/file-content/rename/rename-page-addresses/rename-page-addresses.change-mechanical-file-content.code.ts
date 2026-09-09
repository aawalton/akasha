import { parsedAs } from "@akasha/code/code-source"
import ts from "typescript"
import {
  refusing,
  splicing,
  stating,
} from "../../../../modules/answer/change-answer.module.code.ts"
import type {
  FileChange,
  Said,
  Splice,
} from "../../../../modules/answer/change-answer.module.types.ts"
import type { World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"

const TYPED = /\.tsx?$/

const ADDRESS = /^[a-z][a-z0-9]*(-[a-z0-9]+)*\/[a-z][a-z0-9]*(-[a-z0-9]+)*$/

const NO_ADDRESS = "is no address, an address being a page type and a slug parted by `/`"

const PARTED_BY = "/"

export type RenamePageAddressesAsked = {
  readonly moved: Readonly<Record<string, string>>
}

export function spellingsOver(
  path: string,
  text: string,
  moved: ReadonlyMap<string, string>
): readonly Splice[] {
  const source = parsedAs(path, text)
  const found: Splice[] = []
  const walk = (node: ts.Node): undefined => {
    const now = ts.isStringLiteral(node) ? moved.get(node.text) : undefined
    if (now !== undefined) {
      found.push({ from: node.getStart(source), to: node.getEnd(), put: JSON.stringify(now) })
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return found
}

export function pathsOver(world: World): readonly string[] {
  const found = new Set(world.index.everyPath())
  for (const one of world.over.edits) {
    if (one.kind === "move") {
      found.delete(one.pathFrom)
      found.add(one.pathTo)
      continue
    }
    if (one.kind === "remove") found.delete(one.path)
    else found.add(one.path)
  }
  return [...found]
}

export function openingsIn(moved: ReadonlyMap<string, string>): readonly string[] {
  const found = new Set<string>()
  for (const was of moved.keys()) found.add(was.slice(0, was.indexOf(PARTED_BY) + 1))
  return [...found]
}

function spelledIn(text: string, openings: readonly string[]): boolean {
  for (const one of openings) {
    if (text.includes(one)) return true
  }
  return false
}

function refusalIn(moved: ReadonlyMap<string, string>): string | null {
  if (moved.size === 0) return "no address was handed in, so no address is restated"
  for (const [was, now] of moved) {
    if (!ADDRESS.test(was)) return `\`${was}\` ${NO_ADDRESS}`
    if (!ADDRESS.test(now)) return `\`${now}\` ${NO_ADDRESS}`
    if (was === now) return `\`${now}\` is the address that page already carries`
  }
  return null
}

export function renamePageAddresses(world: World, given: RenamePageAddressesAsked): Said {
  const moved = new Map(Object.entries(given.moved))
  const why = refusalIn(moved)
  if (why !== null) return refusing(why)
  let paths: readonly string[]
  try {
    paths = pathsOver(world)
  } catch (cause) {
    const held = cause instanceof Error ? cause.message : String(cause)
    return refusing(`${held}, so no address was restated`)
  }
  const openings = openingsIn(moved)
  const edits: FileChange[] = []
  for (const path of paths) {
    if (!TYPED.test(path)) continue
    const text = world.textOf(path)
    if (text === null || !spelledIn(text, openings)) continue
    const spots = spellingsOver(path, text, moved)
    if (spots.length === 0) continue
    edits.push(...splicing(path, text, spots))
  }
  return stating(edits)
}

export function runChange(world: World, given: RenamePageAddressesAsked): Promise<Said> {
  return Promise.resolve(renamePageAddresses(world, given))
}
