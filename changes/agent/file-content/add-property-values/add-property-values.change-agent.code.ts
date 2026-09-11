import {
  gathered,
  missing,
  refusing,
} from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  afterIn,
  declaresIn,
  holdsIn,
  readFor,
  singleIn,
  spelledIn,
  targetsIn,
  typeIn,
} from "akasha/changes/modules/page-knowing/page-knowing.module.code.ts"
import { reach, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { reaches } from "akasha/pages/indexes/reaching/reaching.module.code.ts"

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

type Held = {
  readonly single: boolean
  readonly after: string | null
  readonly holds: string | null
}

type Put = Held | { readonly refused: string }

const INSIDE =
  "a field inside a record is reached through the record rather than as a key of its own"

function putIn(world: World, one: Line): Put {
  const read = readFor(world, one.at)
  if ("refused" in read) return { refused: read.refused }
  const stated = typeIn(read.value)
  if (stated !== null && declaresIn(world, read.value, one.key) === false) {
    const named = spelledIn(world, read.value, one.key)
    if (named !== null) {
      const under = `declares that property under the key \`${named}\``
      return { refused: `\`${one.key}\` is a slug, and \`${stated}\` ${under}. Name the key` }
    }
    return { refused: `\`${one.key}\` is no property \`${stated}\` declares, and ${INSIDE}` }
  }
  const targets = targetsIn(read.known, read.value, one.key)
  if (targets.length > 0) {
    const reached = reaches(one.value, targets, read.known)
    if ("refused" in reached) {
      return { refused: `\`${one.key}\` names a relation, and ${reached.refused}` }
    }
  }
  return {
    single: singleIn(world, read.value, one.key),
    after: afterIn(world, read.value, one.key),
    holds: holdsIn(world, read.value, one.key),
  }
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
    const told = held.single ? { ...one, single: true } : one
    const spelled = held.holds === null ? told : { ...told, holds: held.holds }
    const given = held.after === null ? spelled : { ...spelled, after: held.after }
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
