import { expect, test } from "bun:test"
import {
  answered,
  refusing,
  writing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import {
  NOTHING_OVER,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { partsOf, ranBy } from "./change-running.change-runner.code.ts"

const AT = "akasha/one.held.ts"

const WROTE: Answer = answered([writing(AT, null, "held\n")])

function worldOf(): World {
  return {
    root: "/nowhere",
    index: {} as World["index"],
    textOf: () => null,
    over: NOTHING_OVER,
  }
}

test("an address is parted at the first slash into a page type and a slug", () => {
  expect(partsOf("change-command/remove-page")).toEqual(["change-command", "remove-page"])
})

test("an address carrying a slash in its slug keeps that slash in the slug", () => {
  expect(partsOf("change/one/two")).toEqual(["change", "one/two"])
})

test("an address carrying no slash is no address", () => {
  expect(partsOf("remove-page")).toBeNull()
})

test("an address opening with a slash is no address", () => {
  expect(partsOf("/remove-page")).toBeNull()
})

test("an address closing with a slash is no address", () => {
  expect(partsOf("change/")).toBeNull()
})

test("a change loaded is run over the world handed in and answers its own edits", () => {
  const said = ranBy(worldOf(), { run: () => WROTE, guards: [] }, { at: AT })

  expect(said).toEqual(WROTE)
})

test("a change that refuses runs no guard", () => {
  let ran = 0
  const said = ranBy(
    worldOf(),
    {
      run: () => refusing("no"),
      guards: [
        () => {
          ran += 1
          return null
        },
      ],
    },
    {}
  )

  expect(said.refused).toBe("no")
  expect(ran).toBe(0)
})

test("the arguments reach the change as the caller handed the arguments in", () => {
  let held: unknown = null
  ranBy(
    worldOf(),
    {
      run: (_world, given) => {
        held = given
        return WROTE
      },
      guards: [],
    },
    { at: AT, body: "one\ntwo\n" }
  )

  expect(held).toEqual({ at: AT, body: "one\ntwo\n" })
})
