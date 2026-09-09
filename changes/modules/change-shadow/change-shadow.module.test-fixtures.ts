import { expect } from "bun:test"
import { textIn } from "@akasha/indexes/indexing/testing"
import type { Shaped } from "@akasha/indexes/reaching"
import type { Value } from "@akasha/pages/page-value"
import { type BodyOf, refusing, replayed, stating } from "../answer/change-answer.module.code.ts"
import type { Answer } from "../answer/change-answer.module.types.ts"
import { NOTHING_OVER, type Reaching, type World, worldAt } from "./change-shadow.module.code.ts"

type Adding = {
  readonly at: string
  readonly body: string
}

const KNOWS_NOTHING: Shaped = {
  targetOf: () => null,
  admitting: () => [],
  mortal: () => false,
  scoping: () => null,
  filed: () => [],
  fieldsOf: () => [],
  slugOfKeyIn: () => null,
  fieldOfKey: () => null,
}

export function knownOf(said: Partial<Shaped>): Shaped {
  return { ...KNOWS_NOTHING, ...said }
}

export function bodyOf(said: Answer, textOf: BodyOf = () => null): string {
  expect(said.refused).toBe(null)
  const held = replayed(said, textOf)
  expect(held).not.toHaveProperty("refused")
  if ("refused" in held) return ""
  const left = [...held.values()].filter((one): one is string => typeof one === "string")
  expect(left).toHaveLength(1)
  return left[0] ?? ""
}

export function refusalOf(said: Answer, textOf: BodyOf = () => null): string {
  if (said.refused !== null) return said.refused
  const held = replayed(said, textOf)
  return "refused" in held ? held.refused : ""
}

export function worldOf(held: Readonly<Record<string, string>>): World {
  return {
    root: "/nowhere",
    index: {} as World["index"],
    textOf: (path) => held[path] ?? null,
    bodyOf: (path) => held[path] ?? null,
    under: () => [],
    base: (path) => held[path] ?? null,
    over: NOTHING_OVER,
  }
}

export function worldFor(page: Value, body: string, reaching: Reaching): World {
  const known = knownOf({ admitting: (one) => [one] })
  return {
    root: "/nowhere",
    index: { knownIn: () => known, pageByPath: () => page } as never,
    textOf: () => body,
    bodyOf: () => body,
    under: () => [],
    base: () => body,
    over: NOTHING_OVER,
    reaching,
  }
}

export function running(address: string): Reaching {
  return (_world, at, given) => {
    if (at === address) {
      const asked = given as Adding
      return Promise.resolve(stating([{ kind: "add", path: asked.at, content: asked.body }]))
    }
    return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
  }
}

export function worldIn(root: string, address: string): World {
  return worldAt(root, textIn(root), running(address))
}

export function taking(address: string): Reaching {
  return (_world, at, given) => {
    if (at === address) {
      const asked = given as { readonly at: string }
      return Promise.resolve(stating([{ kind: "remove", path: asked.at }]))
    }
    return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
  }
}

export function worldTaking(root: string, address: string): World {
  return worldAt(root, textIn(root), taking(address))
}
