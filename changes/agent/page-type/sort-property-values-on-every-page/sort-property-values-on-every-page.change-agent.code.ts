import { refusing } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  carryingOver,
  type KeyHoldingAsked,
  keyAskedIn,
  keyHoldingTakes,
} from "akasha/changes/modules/value-carrying/value-carrying.module.code.ts"

const ADD_PROPERTY_VALUE = "change-mechanical-file-content/add-property-value"

const REMOVE_PROPERTY_VALUE = "change-mechanical-file-content/remove-property-value"

export type Carried = {
  readonly path: string
  readonly carried: readonly string[]
}

export function keptInOrder(values: readonly string[]): ReadonlySet<number> {
  const longest = values.map(() => 1)
  for (let at = 1; at < values.length; at += 1) {
    for (let above = 0; above < at; above += 1) {
      if ((values[above] ?? "") > (values[at] ?? "")) continue
      const held = (longest[above] ?? 0) + 1
      if (held > (longest[at] ?? 0)) longest[at] = held
    }
  }
  let want = 0
  for (const one of longest) if (one > want) want = one
  const kept = new Set<number>()
  let after: string | null = null
  for (let at = values.length - 1; at >= 0; at -= 1) {
    if ((longest[at] ?? 0) !== want) continue
    const one = values[at] ?? ""
    if (after !== null && one > after) continue
    kept.add(at)
    after = one
    want -= 1
  }
  return kept
}

export function carriedIn(values: readonly string[]): readonly string[] {
  const kept = keptInOrder(values)
  return values.filter((_one, at) => !kept.has(at))
}

export function valuesIn(held: unknown): readonly string[] | null {
  if (!Array.isArray(held)) return null
  const found: string[] = []
  for (const one of held) {
    if (typeof one !== "string") return null
    found.push(one)
  }
  return found
}

export function outOfOrderIn(world: World, given: KeyHoldingAsked): readonly Carried[] | string {
  if (world.index.propertiesIfNamed(given.pageType) === null) {
    return `\`${given.pageType}\` names no page type`
  }
  const found: Carried[] = []
  const atMost = given.atMost ?? null
  for (const kind of world.index.kindsUnder(given.pageType)) {
    for (const [path, value] of world.index.valuesByPath(kind)) {
      if (atMost !== null && found.length >= atMost) return found
      const values = valuesIn(value[given.key])
      if (values === null) continue
      const carried = carriedIn(values)
      if (carried.length === 0) continue
      found.push({ path, carried })
    }
  }
  return found
}

export async function sortPropertyValuesOnEveryPage(
  world: World,
  given: KeyHoldingAsked
): Promise<Answer> {
  const held = outOfOrderIn(world, given)
  if (typeof held === "string") return refusing(held)
  if (held.length === 0) {
    return refusing(`no \`${given.pageType}\` holds \`${given.key}\` out of the order it sorts in`)
  }
  const carrier = carryingOver(world)
  for (const one of held) {
    for (const value of one.carried) {
      const asked = { at: one.path, key: given.key, value }
      const off = await carrier.reaching(REMOVE_PROPERTY_VALUE, asked)
      if (off !== null) return refusing(`\`${one.path}\` is refused, and ${off}`)
      const put = await carrier.reaching(ADD_PROPERTY_VALUE, asked)
      if (put !== null) return refusing(`\`${one.path}\` is refused, and ${put}`)
    }
  }
  return carrier.gatheredIn()
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = keyHoldingTakes

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const asked = keyAskedIn(given)
  if (typeof asked === "string") return refusing(asked)
  return await sortPropertyValuesOnEveryPage(world, asked)
}
