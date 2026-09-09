import { reaches } from "@akasha/indexes/reaching"
import { gathered, missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import {
  readFor,
  singleIn,
  targetsIn,
} from "../../../modules/page-knowing/page-knowing.module.code.ts"
import { reach, type World } from "../../../modules/shadow/change-shadow.module.code.ts"

const ADD_PROPERTY_VALUE = "change-mechanical-file-content/add-property-value"

const ADDED = "added"

const LINE = /^(\S+)\s+(\S+)\s+(.+)$/

const PARTED = "is no path, key and value parted by spaces"

const NO_LINE = "no line was handed in, so no value is put in"

export type Line = {
  readonly at: string
  readonly key: string
  readonly value: string
}

export type Read = { readonly lines: readonly Line[] } | { readonly refused: string }

export function readIn(said: string): Read {
  const lines: Line[] = []
  for (const line of said.split("\n")) {
    const one = line.trim()
    if (one === "") continue
    const found = LINE.exec(one)
    const at = found?.[1]
    const key = found?.[2]
    const value = found?.[3]
    if (at === undefined || key === undefined || value === undefined) {
      return { refused: `\`${one}\` ${PARTED}` }
    }
    lines.push({ at, key, value })
  }
  return { lines }
}

type Put = { readonly single: boolean } | { readonly refused: string }

function putIn(world: World, one: Line): Put {
  const read = readFor(world, one.at)
  if ("refused" in read) return { refused: read.refused }
  const targets = targetsIn(read.known, read.value, one.key)
  if (targets.length > 0) {
    const reached = reaches(one.value, targets, read.known)
    if ("refused" in reached) {
      return { refused: `\`${one.key}\` names a relation, and ${reached.refused}` }
    }
  }
  return { single: singleIn(world, read.value, one.key) }
}

function lineOf(one: Line): string {
  return `\`${one.at} ${one.key} ${one.value}\` is the line, and no value here is put in`
}

export async function addPropertyValues(world: World, lines: readonly Line[]): Promise<Answer> {
  const put: Answer[] = []
  let seen = world
  for (const one of lines) {
    const held = putIn(seen, one)
    if ("refused" in held) return refusing(`${held.refused}. ${lineOf(one)}`)
    const given = held.single ? { ...one, single: true } : one
    const reached = await reach(seen, ADD_PROPERTY_VALUE, given)
    const why = reached.said.refused
    if (why !== null) return refusing(`${why}. ${lineOf(one)}`)
    put.push(reached.said)
    seen = reached.world
  }
  return gathered(put)
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const body = given[ADDED]
  if (body === undefined) return refusing(missing(ADDED))
  const read = readIn(body)
  if ("refused" in read) return refusing(read.refused)
  if (read.lines.length === 0) return refusing(NO_LINE)
  return await addPropertyValues(world, read.lines)
}
