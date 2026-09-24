import { afterAll, expect, test } from "bun:test"
import {
  appOf,
  appsAmong,
  appsReached,
  judgedFor,
} from "akasha/check/code/pages/browser-code-compiles/browser-code-compiles.check-code.decision.code.ts"
import { layingOver } from "akasha/check/code/pages/browser-code-compiles/browser-code-compiles.check-code.decision.test-fixtures.ts"
import {
  ADDED_AT,
  ADDED_BREAKS,
  APP,
  BREAKS,
  CONFIG_AT,
  ROUTE_AT,
  scratch,
  TABLE_ADDING,
  TABLE_AT,
  TABLE_UNREAD,
  written,
} from "akasha/check/code/pages/browser-code-compiles/modules/route-typegen/route-typegen.module.test-fixtures.ts"

afterAll(scratch.sweep)

const WAITS = 60_000

const APPS = ["alan/web", "product/held/web"]

test("a router app is the folder its page sits in", () => {
  const pages = ["product/held/web/held-web.router-app.ts", "alan/web/alan-web.router-app.ts"]
  expect(appsAmong(pages)).toEqual(APPS)
})

test("a path belongs to the router app whose folder holds it", () => {
  expect(appOf("alan/web/routes/one.ts", APPS)).toBe("alan/web")
  expect(appOf("alan/webbed/one.ts", APPS)).toBeNull()
  expect(appOf("alan/one.ts", APPS)).toBeNull()
})

test("the router apps reached are named once each", () => {
  const reached = ["alan/web/one.ts", "alan/web/two.ts", "design/three.ts"]
  expect(appsReached(reached, APPS)).toEqual(["alan/web"])
})

test(
  "a router app that compiles is refused nothing",
  async () => {
    const root = written()
    expect(await judgedFor([APP], layingOver(root, {}))).toEqual([])
  },
  WAITS
)

test(
  "a route whose type fails through its generated route types is refused against that route",
  async () => {
    const root = written()
    const said = await judgedFor([APP], layingOver(root, { [ROUTE_AT]: BREAKS }))
    expect(said.map((one) => one.path)).toEqual([ROUTE_AT])
    expect(said[0]?.reason).toContain("TS2322")
    expect(said[0]?.reason).toContain(`\`${APP}\``)
  },
  WAITS
)

test(
  "a route the change adds is typed through the route types that change's table generates",
  async () => {
    const root = written()
    const over = { [TABLE_AT]: TABLE_ADDING, [ADDED_AT]: ADDED_BREAKS }
    const said = await judgedFor([APP], layingOver(root, over))
    expect(said.map((one) => one.path)).toEqual([ADDED_AT])
  },
  WAITS
)

test(
  "a table the typegen refuses is refused against that table",
  async () => {
    const root = written()
    const said = await judgedFor([APP], layingOver(root, { [TABLE_AT]: TABLE_UNREAD }))
    expect(said.map((one) => one.path)).toEqual([TABLE_AT])
    expect(said[0]?.reason).toContain("typegen")
  },
  WAITS
)

test("a router app with no compile config is compiled by nothing here", async () => {
  const root = written()
  expect(await judgedFor([APP], layingOver(root, { [CONFIG_AT]: null }))).toEqual([])
})
