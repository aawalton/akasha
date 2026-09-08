import { expect, test } from "bun:test"
import { refusing, stating } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import {
  NOTHING_OVER,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { codeAt, partsOf, ranBy, sittingAt } from "./change-running.change-runner.code.ts"

const AT = "akasha/one.held.ts"

const WAS = "akasha/one/one.held.code.ts"

const NOW = "akasha/one/one.held-anew.code.ts"

const WAS_PAGE = "akasha/one/held-one.held-kind.ts"

const NOW_PAGE = "akasha/one/held-one.held-other.ts"

const WROTE: Answer = stating([{ kind: "add", path: AT, content: "held\n" }])

function moving(was: string, now: string): Answer {
  return stating([{ kind: "move", pathFrom: was, pathTo: now }])
}

test("a path a move carries a body to is loaded from the path that body came from", () => {
  const world = { ...worldOf(), over: { kind: "move", pathFrom: WAS, pathTo: NOW } }

  expect(sittingAt(world, NOW)).toBe(WAS)
})

test("a path no move carries a body to is loaded from that path", () => {
  expect(sittingAt(worldOf(), AT)).toBe(AT)
})

test("a page a move carries elsewhere is read for its code beside the path that page came from", () => {
  const world = {
    ...worldOf(),
    index: { listedAt: () => [{ path: NOW_PAGE }] } as never,
    over: { kind: "move", pathFrom: WAS_PAGE, pathTo: NOW_PAGE },
  }

  expect(codeAt(world, "held-kind/held-one")).toBe("akasha/one/held-one.held-kind.code.ts")
})

function worldOf(): World {
  return {
    root: "/nowhere",
    index: {} as World["index"],
    textOf: () => null,
    over: NOTHING_OVER,
  }
}

test("an address is parted at the first slash into a page type and a slug", () => {
  expect(partsOf("change-checked/remove-page")).toEqual(["change-checked", "remove-page"])
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

test("a change loaded is run over the world handed in and answers its own edits", async () => {
  const said = await ranBy(worldOf(), { run: () => WROTE, guards: [] }, { at: AT })

  expect(said).toEqual(WROTE)
})

test("a change whose run settles later is awaited before its guards run", async () => {
  const said = await ranBy(worldOf(), { run: () => Promise.resolve(WROTE), guards: [] }, { at: AT })

  expect(said).toEqual(WROTE)
})

test("a change that refuses runs no guard", async () => {
  let ran = 0
  const said = await ranBy(
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

test("the arguments reach the change as the caller handed the arguments in", async () => {
  let held: unknown = null
  await ranBy(
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
