import { expect } from "bun:test"
import { textIn } from "@akasha/indexes/indexing/testing"
import type { Shaped } from "@akasha/indexes/reaching"
import {
  type BodyOf,
  refusing,
  replayed,
  stating,
} from "../change-answer/change-answer.module.code.ts"
import type { Answer } from "../change-answer/change-answer.module.types.ts"
import { NOTHING_OVER, type Reaching, type World, worldAt } from "./change-shadow.module.code.ts"

type Adding = {
  readonly at: string
  readonly body: string
}

const KNOWS_NOTHING: Shaped = {
  targetOf: () => null,
  admitting: () => [],
  mortal: () => false,
  at: () => [],
  byId: () => null,
  fieldsOf: () => [],
  slugOfKeyIn: () => null,
  fieldOfKey: () => null,
}

export function knownOf(said: Partial<Shaped>): Shaped {
  return { ...KNOWS_NOTHING, ...said }
}

const NOTHING: BodyOf = () => null

export function bodyOf(said: Answer, textOf: BodyOf = NOTHING): string {
  expect(said.refused).toBe(null)
  const held = replayed(said, textOf)
  expect(held).not.toHaveProperty("refused")
  if ("refused" in held) return ""
  const left = [...held.values()].filter((one) => one !== null)
  expect(left).toHaveLength(1)
  return left[0] ?? ""
}

export function worldOf(held: Readonly<Record<string, string>>): World {
  return {
    root: "/nowhere",
    index: {} as World["index"],
    textOf: (path) => held[path] ?? null,
    base: (path) => held[path] ?? null,
    over: NOTHING_OVER,
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
