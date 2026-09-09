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
import type { World } from "../../../../modules/shadow/change-shadow.module.code.ts"

const TYPED = /\.tsx?$/

const ADDRESS = /^[a-z][a-z0-9]*(-[a-z0-9]+)*\/[a-z][a-z0-9]*(-[a-z0-9]+)*$/

const NO_ADDRESS = "is no address, an address being a page type and a slug parted by `/`"

export type RenamePageAddressAsked = {
  readonly was: string
  readonly now: string
}

export function spellingsIn(
  path: string,
  text: string,
  was: string,
  now: string
): readonly Splice[] {
  const source = parsedAs(path, text)
  const put = JSON.stringify(now)
  const found: Splice[] = []
  const walk = (node: ts.Node): undefined => {
    if (ts.isStringLiteral(node) && node.text === was) {
      found.push({ from: node.getStart(source), to: node.getEnd(), put })
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return found
}

export function pathsIn(world: World): readonly string[] {
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

export function renamePageAddress(world: World, given: RenamePageAddressAsked): Said {
  if (!ADDRESS.test(given.was)) return refusing(`\`${given.was}\` ${NO_ADDRESS}`)
  if (!ADDRESS.test(given.now)) return refusing(`\`${given.now}\` ${NO_ADDRESS}`)
  if (given.was === given.now) {
    return refusing(`\`${given.now}\` is the address that page already carries`)
  }
  let paths: readonly string[]
  try {
    paths = pathsIn(world)
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return refusing(`${why}, so no address was restated`)
  }
  const edits: FileChange[] = []
  for (const path of paths) {
    if (!TYPED.test(path)) continue
    const text = world.textOf(path)
    if (text === null || !text.includes(given.was)) continue
    const spots = spellingsIn(path, text, given.was, given.now)
    if (spots.length === 0) continue
    edits.push(...splicing(path, text, spots))
  }
  return stating(edits)
}

export function runChange(world: World, given: RenamePageAddressAsked): Promise<Said> {
  return Promise.resolve(renamePageAddress(world, given))
}
