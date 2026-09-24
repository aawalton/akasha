import { afterAll, expect, test } from "bun:test"
import { routerAppCompiles } from "akasha/check/code/pages/browser-code-compiles/browser-code-compiles.check-code.audit.code.ts"
import { appStaged } from "akasha/check/code/pages/browser-code-compiles/browser-code-compiles.check-code.decision.test-fixtures.ts"
import {
  BREAKS,
  ROUTE_AT,
  scratch,
} from "akasha/check/code/pages/browser-code-compiles/modules/route-typegen/route-typegen.module.test-fixtures.ts"
import { tracked } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratch as staging } from "akasha/check/test-fixtures/staging/check-staging.test-fixture.code.ts"

afterAll(scratch.sweep)

afterAll(staging.sweep)

const WAITS = 60_000

test(
  "an audit compiles every router app and refuses nothing where each compiles",
  async () => {
    expect(await routerAppCompiles(tracked(appStaged()))).toEqual([])
  },
  WAITS
)

test(
  "an audit refuses a route that does not compile in its router app",
  async () => {
    const said = await routerAppCompiles(tracked(appStaged({ [ROUTE_AT]: BREAKS })))
    expect(said.map((one) => one.path)).toEqual([ROUTE_AT])
  },
  WAITS
)
