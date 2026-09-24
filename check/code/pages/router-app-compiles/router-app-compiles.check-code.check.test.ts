import { afterAll, expect, test } from "bun:test"
import {
  BREAKS,
  CONFIG_AT,
  ROUTE_AT,
  SHARED,
  SHARED_AT,
  SHARING,
  scratch,
} from "akasha/check/code/pages/router-app-compiles/modules/route-typegen/route-typegen.module.test-fixtures.ts"
import { routerAppCompiles } from "akasha/check/code/pages/router-app-compiles/router-app-compiles.check-code.check.code.ts"
import {
  APART_AT,
  appStaged,
} from "akasha/check/code/pages/router-app-compiles/router-app-compiles.check-code.decision.test-fixtures.ts"
import {
  change,
  scratch as staging,
} from "akasha/check/test-fixtures/staging/check-staging.test-fixture.code.ts"
import { shadowAsked } from "akasha/page/modules/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

afterAll(staging.sweep)

const WAITS = 60_000

test("a body of TypeScript anywhere is input to this check", () => {
  expect(routerAppCompiles.isInput(APART_AT, {} as never)).toBe(true)
})

test("a file under a router app's folder is input however it is named", () => {
  const given = change(appStaged(), {})
  const shadow = shadowAsked(given)
  expect(routerAppCompiles.isInput(CONFIG_AT, shadow)).toBe(true)
  expect(routerAppCompiles.isInput("held/notes.txt", shadow)).toBe(false)
})

test(
  "a change reaching no router app compiles nothing",
  async () => {
    const given = change(appStaged({ [ROUTE_AT]: BREAKS }), {
      [APART_AT]: "export const apart = 2\n",
    })
    expect(await routerAppCompiles(given, shadowAsked(given))).toEqual([])
  },
  WAITS
)

test(
  "a change breaking a route is refused against that route",
  async () => {
    const given = change(appStaged(), { [ROUTE_AT]: BREAKS })
    const said = await routerAppCompiles(given, shadowAsked(given))
    expect(said.map((one) => one.path)).toEqual([ROUTE_AT])
    expect(said[0]?.reason).toContain("TS2322")
  },
  WAITS
)

test(
  "a module taken away that a route imports refuses that route",
  async () => {
    const given = change(appStaged({ [ROUTE_AT]: SHARING, [SHARED_AT]: SHARED }), {
      [SHARED_AT]: null,
    })
    const said = await routerAppCompiles(given, shadowAsked(given))
    expect(said.map((one) => one.path)).toEqual([ROUTE_AT])
    expect(said[0]?.reason).toContain("TS2307")
  },
  WAITS
)
