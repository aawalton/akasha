import { textIn } from "@akasha/indexes/indexing/testing"
import { answered, refusing, writing } from "../change-answer/change-answer.module.code.ts"
import { NOTHING_OVER, type Reaching, type World, worldAt } from "./change-shadow.module.code.ts"

type Adding = {
  readonly at: string
  readonly body: string
}

export function worldOf(held: Readonly<Record<string, string>>): World {
  return {
    root: "/nowhere",
    index: {} as World["index"],
    textOf: (path) => held[path] ?? null,
    over: NOTHING_OVER,
  }
}

export function running(address: string): Reaching {
  return (_world, at, given) => {
    if (at === address) {
      const asked = given as Adding
      return Promise.resolve(answered([writing(asked.at, null, asked.body)]))
    }
    return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
  }
}

export function worldIn(root: string, address: string): World {
  return worldAt(root, textIn(root), running(address))
}
