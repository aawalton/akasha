import { gathered, missing } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  isLedger,
  ledgerAt,
  type Reaches,
  reach,
  type World,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

const PAGE_TYPE = "page-type"

const FROM = "from"

const TO = "to"

const MOST = "most"

const KEY = "key"

export type ValueCarryingAsked = {
  readonly pageType: string
  readonly from: string
  readonly to: string
  readonly most?: number | null
}

export type KeyHoldingAsked = {
  readonly pageType: string
  readonly key: string
  readonly most?: number | null
}

export type Asked = Readonly<Record<string, string>>

export type Carrying = { readonly path: string; readonly value: string }

export type Carrier = {
  readonly reaching: (address: Reaches, asked: unknown) => Promise<string | null>
  readonly gatheredIn: () => Answer
}

export function spelledAs(held: unknown, many: boolean): string | null {
  if (many || !Array.isArray(held)) return JSON.stringify(held) ?? null
  if (held.length !== 1) return null
  return JSON.stringify(held[0]) ?? null
}

export function holdingIn(world: World, given: KeyHoldingAsked): readonly string[] | string {
  const carried = world.index.propertiesIfNamed(given.pageType)
  if (carried === null) return `\`${given.pageType}\` names no page type`
  if (!carried.some((one) => one.key === given.key)) {
    return `a \`${given.pageType}\` carries no property under \`${given.key}\``
  }
  const found: string[] = []
  const most = given.most ?? null
  for (const kind of world.index.kindsUnder(given.pageType)) {
    for (const [path, value] of world.index.valuesByPath(kind)) {
      if (most !== null && found.length >= most) return found
      if (value[given.key] === undefined) continue
      found.push(path)
    }
  }
  return found
}

export function carriedIn(world: World, given: ValueCarryingAsked): readonly Carrying[] | string {
  const carried = world.index.propertiesIfNamed(given.pageType)
  if (carried === null) return `\`${given.pageType}\` names no page type`
  const into = carried.find((one) => one.key === given.to)
  if (into === undefined) return `a \`${given.pageType}\` has no property under \`${given.to}\``
  if (!carried.some((one) => one.key === given.from)) {
    return `a \`${given.pageType}\` has no property under \`${given.from}\``
  }
  const found: Carrying[] = []
  const most = given.most ?? null
  for (const kind of world.index.kindsUnder(given.pageType)) {
    for (const [path, value] of world.index.valuesByPath(kind)) {
      if (most !== null && found.length >= most) return found
      if (value[given.to] !== undefined) continue
      const held = value[given.from]
      if (held === undefined) continue
      const said = spelledAs(held, into.many)
      if (said === null) {
        return `\`${path}\` has more than one value under \`${given.from}\`, and \`${given.to}\` holds one`
      }
      found.push({ path, value: said })
    }
  }
  return found
}

export function carryingOver(world: World): Carrier {
  const answers: Answer[] = []
  let over: World = isLedger(world)
    ? world
    : ledgerAt(world.root, world.bodyOf, world.reaching, world.textOf)
  return {
    reaching: async (address, asked) => {
      const said = await reach(over, address, asked)
      if (said.said.refused !== null) return said.said.refused
      over = said.world
      answers.push(said.said)
      return null
    },
    gatheredIn: () => gathered(answers),
  }
}

export function mostIn(said: string | undefined): number | null | string {
  if (said === undefined) return null
  const held = Number(said)
  if (!Number.isInteger(held) || held < 1) {
    return `\`${said}\` is no count of pages, a count being a whole number above nothing`
  }
  return held
}

export function keyAskedIn(given: Asked): KeyHoldingAsked | string {
  const pageType = given[PAGE_TYPE]
  if (pageType === undefined) return missing(PAGE_TYPE)
  const key = given[KEY]
  if (key === undefined) return missing(KEY)
  const most = mostIn(given[MOST])
  if (typeof most === "string") return most
  return { pageType, key, most }
}

export function askedIn(given: Asked): ValueCarryingAsked | string {
  const pageType = given[PAGE_TYPE]
  if (pageType === undefined) return missing(PAGE_TYPE)
  const from = given[FROM]
  if (from === undefined) return missing(FROM)
  const to = given[TO]
  if (to === undefined) return missing(TO)
  const most = mostIn(given[MOST])
  if (typeof most === "string") return most
  return { pageType, from, to, most }
}
