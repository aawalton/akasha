import { parsedAs } from "@akasha/code/code-source"
import ts from "typescript"
import {
  answered,
  refusing,
  writing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer, Edit } from "../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

const TYPED = /\.tsx?$/

const ADDRESS = /^[a-z][a-z0-9]*(-[a-z0-9]+)*\/[a-z][a-z0-9]*(-[a-z0-9]+)*$/

const NO_ADDRESS = "is no address, an address being a page type and a slug parted by `/`"

export type RenamePageAddressAsked = {
  readonly was: string
  readonly now: string
}

export type Spot = {
  readonly start: number
  readonly end: number
}

export function spellingsIn(path: string, text: string, was: string): readonly Spot[] {
  const source = parsedAs(path, text)
  const found: Spot[] = []
  const walk = (node: ts.Node): undefined => {
    if (ts.isStringLiteral(node) && node.text === was) {
      found.push({ start: node.getStart(source), end: node.getEnd() })
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return found
}

export function respelled(text: string, spots: readonly Spot[], now: string): string {
  const put = JSON.stringify(now)
  let body = text
  for (const one of [...spots].sort((here, there) => there.start - here.start)) {
    body = body.slice(0, one.start) + put + body.slice(one.end)
  }
  return body
}

export function renamePageAddress(world: World, given: RenamePageAddressAsked): Answer {
  if (!ADDRESS.test(given.was)) return refusing(`\`${given.was}\` ${NO_ADDRESS}`)
  if (!ADDRESS.test(given.now)) return refusing(`\`${given.now}\` ${NO_ADDRESS}`)
  if (given.was === given.now) {
    return refusing(`\`${given.now}\` is the address that page already carries`)
  }
  let paths: readonly string[]
  try {
    paths = world.index.everyPath()
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return refusing(`${why}, so no address was restated`)
  }
  const edits: Edit[] = []
  for (const path of paths) {
    if (!TYPED.test(path)) continue
    const text = world.textOf(path)
    if (text === null || !text.includes(given.was)) continue
    const spots = spellingsIn(path, text, given.was)
    if (spots.length === 0) continue
    edits.push(writing(path, text, respelled(text, spots, given.now)))
  }
  return answered(edits)
}

export function runChange(world: World, given: RenamePageAddressAsked): Promise<Answer> {
  return Promise.resolve(renamePageAddress(world, given))
}
