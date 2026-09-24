import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  bindingOf,
  declaredIn,
  globallyReached,
  identifiersIn,
  referencing,
  typeParameterOf,
} from "akasha/code/reading/modules/code-binding/code-binding.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const AMBIENT = "ambient-types"

const SECTION = "d"

const HELD = "ts"

export const UNDER = "akasha"

export const PARTED = "/"

export type Declaring = ReadonlyMap<string, readonly string[]>

export type Reaching = Map<string, readonly string[]>

export function declaringIn(world: World): Declaring {
  const found = new Map<string, string[]>()
  const carried = world.index.carryingOf(AMBIENT)
  if ("refused" in carried) return found
  for (const listed of carried.carrying) {
    const at = besideAt(listed.path, SECTION, HELD)
    if (at === null) continue
    const text = world.textOf(at)
    if (text === null) continue
    for (const name of declaredIn(parsedAs(at, text)).keys()) {
      const held = found.get(name)
      if (held === undefined) found.set(name, [at])
      else held.push(at)
    }
  }
  return found
}

export function namesIn(declaring: Declaring, at: string, text: string): readonly string[] {
  const found = new Set<string>()
  for (const one of identifiersIn(parsedAs(at, text))) {
    if (!declaring.has(one.text)) continue
    if (!globallyReached(one)) {
      if (!referencing(one)) continue
      if (bindingOf(one) !== null || typeParameterOf(one) !== null) continue
    }
    found.add(one.text)
  }
  return [...found]
}

export function namesAt(
  world: World,
  declaring: Declaring,
  at: string,
  reaching: Reaching
): readonly string[] {
  const held = reaching.get(at)
  if (held !== undefined) return held
  const body = world.textOf(at)
  const names = body === null ? [] : namesIn(declaring, at, body)
  reaching.set(at, names)
  return names
}

export function reachedIn(
  world: World,
  declaring: Declaring,
  path: string,
  text: string,
  reaching: Reaching = new Map()
): readonly string[] {
  const found = new Set<string>()
  const rest = [...namesIn(declaring, path, text)]
  while (rest.length > 0) {
    const name = rest.pop()
    const held = name === undefined ? undefined : declaring.get(name)
    for (const at of held ?? []) {
      if (found.has(at)) continue
      found.add(at)
      rest.push(...namesAt(world, declaring, at, reaching))
    }
  }
  return [...found].map((one) => `${UNDER}${PARTED}${one}`).sort()
}
