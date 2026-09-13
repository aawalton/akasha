import { missing, refusing } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  type Asked,
  atMostIn,
  carryingOver,
} from "akasha/changes/modules/value-carrying/value-carrying.module.code.ts"

const PAGE_TYPE = "page-type"

const KEYS = "keys"

const NEEDS = "needs"

const TO = "to"

const AT_MOST = "at-most"

const ADD_PROPERTY_RECORD = "change-mechanical-file-content/add-property-record"

const REMOVE_PAGE_PROPERTY = "change-mechanical-file-content/remove-page-property"

export type RecordGatheringAsked = {
  readonly pageType: string
  readonly keys: readonly string[]
  readonly needs: readonly string[]
  readonly to: string
  readonly atMost?: number | null
}

export type Gathering = {
  readonly path: string
  readonly record: string
  readonly after: string
  readonly keys: readonly string[]
}

export function keysIn(said: string): readonly string[] {
  return said
    .split(",")
    .map((one) => one.trim())
    .filter((one) => one !== "")
}

export function recordSpelledAs(
  held: Readonly<Record<string, unknown>>,
  keys: readonly string[]
): string {
  return `{ ${keys.map((key) => `${key}: ${JSON.stringify(held[key])}`).join(", ")} }`
}

export function gatheringIn(
  world: World,
  given: RecordGatheringAsked
): readonly Gathering[] | string {
  const carried = world.index.propertiesIfNamed(given.pageType)
  if (carried === null) return `\`${given.pageType}\` names no page type`
  const into = carried.find((one) => one.key === given.to)
  if (into === undefined) return `a \`${given.pageType}\` has no property under \`${given.to}\``
  if (!into.many) {
    return `a \`${given.pageType}\` holds one \`${given.to}\`, and a record is one of many`
  }
  const unknown = given.keys.find((key) => !carried.some((one) => one.key === key))
  if (unknown !== undefined) {
    return `a \`${given.pageType}\` has no property under \`${unknown}\``
  }
  const found: Gathering[] = []
  const atMost = given.atMost ?? null
  for (const kind of world.index.kindsUnder(given.pageType)) {
    for (const [path, value] of world.index.valuesByPath(kind)) {
      if (atMost !== null && found.length >= atMost) return found
      if (value[given.to] !== undefined) continue
      if (given.needs.some((key) => value[key] === undefined)) continue
      const keys = given.keys.filter((key) => value[key] !== undefined)
      const first = keys[0]
      if (first === undefined) continue
      found.push({ path, record: recordSpelledAs(value, keys), after: first, keys })
    }
  }
  return found
}

export async function movePropertiesIntoARecordOnEveryPage(
  world: World,
  given: RecordGatheringAsked
): Promise<Answer> {
  const held = gatheringIn(world, given)
  if (typeof held === "string") return refusing(held)
  const carrier = carryingOver(world)
  for (const one of held) {
    const put = await carrier.reaching(ADD_PROPERTY_RECORD, {
      at: one.path,
      key: given.to,
      record: one.record,
      after: one.after,
    })
    if (put !== null) return refusing(`\`${one.path}\` is refused, and ${put}`)
    for (const key of one.keys) {
      const off = await carrier.reaching(REMOVE_PAGE_PROPERTY, { at: one.path, key })
      if (off !== null) return refusing(`\`${one.path}\` is refused, and ${off}`)
    }
  }
  return carrier.gatheredIn()
}

export const takes: readonly string[] = [PAGE_TYPE, KEYS, NEEDS, TO, AT_MOST]

export function recordAskedIn(given: Asked): RecordGatheringAsked | string {
  const pageType = given[PAGE_TYPE]
  if (pageType === undefined) return missing(PAGE_TYPE)
  const said = given[KEYS]
  if (said === undefined) return missing(KEYS)
  const to = given[TO]
  if (to === undefined) return missing(TO)
  const keys = keysIn(said)
  if (keys.length === 0) return `\`${said}\` names no key, and a record is made of keys`
  const needs = keysIn(given[NEEDS] ?? "")
  const outside = needs.find((one) => !keys.includes(one))
  if (outside !== undefined) return `\`${outside}\` is needed and is no key gathered here`
  const atMost = atMostIn(given[AT_MOST])
  if (typeof atMost === "string") return atMost
  return { pageType, keys, needs, to, atMost }
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const asked = recordAskedIn(given)
  if (typeof asked === "string") return refusing(asked)
  return await movePropertiesIntoARecordOnEveryPage(world, asked)
}
