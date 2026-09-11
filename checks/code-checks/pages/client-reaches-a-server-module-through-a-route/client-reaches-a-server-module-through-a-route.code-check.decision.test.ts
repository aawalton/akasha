import { expect, test } from "bun:test"
import {
  type Asking,
  appsIn,
  passedOver,
  reachesIn,
  refusalsOver,
  routesOf,
} from "akasha/checks/code-checks/pages/client-reaches-a-server-module-through-a-route/client-reaches-a-server-module-through-a-route.code-check.decision.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const PAGE = "hum/hum.router-app.ts"

const TABLE = "hum/routes.ts"

const PLAIN = "hum/panel/panel.module.code.tsx"

const ROUTE = "hum/routes/home.tsx"

const APP: Value = {
  slug: "hum",
  rootRoute: "tsx",
  routeTable: "ts",
  serverEntry: "tsx",
  appLayout: "tsx",
}

const NAMED = new Map<string, string | null>([
  ["route-table", "routes.ts"],
  ["root-route", "root.tsx"],
  ["server-entry", "entry.server.tsx"],
  ["app-layout", "routes/_hum-layout.tsx"],
  ["manifest", "package.json"],
])

const TABLE_TEXT = 'export default [route("home", "routes/home.tsx")]\n'

const EVERY = [
  PAGE,
  TABLE,
  ROUTE,
  PLAIN,
  "hum/root.tsx",
  "hum/entry.server.tsx",
  "hum/routes/_hum-layout.tsx",
  "hum/.server/held/held.module.code.ts",
  "hum/panel/panel.module.test.tsx",
]

const LEAK = 'import { held } from "../.server/held/held.module.code.ts"\n'

function asking(texts: Readonly<Record<string, string>>, given?: Partial<Asking>): Asking {
  return {
    appsFiled: () => [PAGE],
    valueAt: (path) => (path === PAGE ? APP : null),
    namedFilesOf: () => NAMED,
    everyPath: () => EVERY,
    textAt: (path) => texts[path] ?? null,
    ...given,
  }
}

function over(path: string, text: string): readonly string[] {
  const texts = { [TABLE]: TABLE_TEXT, [path]: text }
  return refusalsOver([path], asking(texts)).map((one) => one.reason)
}

test("a plain module reaching a server folder is refused", () => {
  const said = over(PLAIN, LEAK)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("../.server/held/held.module.code.ts")
})

test("a specifier whose name ends in `.server` is refused", () => {
  expect(over(PLAIN, 'import { held } from "./held.server.ts"\n')).toHaveLength(1)
})

test("a dynamic import of a server module is refused", () => {
  expect(
    over(PLAIN, 'const held = await import("../.server/held/held.module.code.ts")\n')
  ).toHaveLength(1)
})

test("a value re-export of a server module is refused", () => {
  expect(over(PLAIN, 'export { held } from "../.server/held/held.module.code.ts"\n')).toHaveLength(
    1
  )
})

test("an import taken for its side effect alone is refused", () => {
  expect(over(PLAIN, 'import "../.server/held/held.module.code.ts"\n')).toHaveLength(1)
})

test("a namespace import of a server module is refused", () => {
  expect(over(PLAIN, 'import * as held from "./held.server.ts"\n')).toHaveLength(1)
})

test("an import clause marked `type` is let through", () => {
  expect(over(PLAIN, 'import type { Held } from "../.server/held/held.module.code.ts"\n')).toEqual(
    []
  )
})

test("every named element marked `type` is let through", () => {
  expect(over(PLAIN, 'import { type Held, type More } from "./held.server.ts"\n')).toEqual([])
})

test("one named element carrying a value among types is refused", () => {
  expect(over(PLAIN, 'import { type Held, held } from "./held.server.ts"\n')).toHaveLength(1)
})

test("a type-only re-export is let through", () => {
  expect(over(PLAIN, 'export type { Held } from "./held.server.ts"\n')).toEqual([])
})

test("a specifier naming no server module is let through", () => {
  expect(over(PLAIN, 'import { held } from "../held/held.module.code.ts"\n')).toEqual([])
})

test("a route module the table names is let through", () => {
  expect(over(ROUTE, LEAK)).toEqual([])
})

test("the root route is let through", () => {
  expect(over("hum/root.tsx", LEAK)).toEqual([])
})

test("the app layout is let through", () => {
  expect(over("hum/routes/_hum-layout.tsx", LEAK)).toEqual([])
})

test("a test file is let through", () => {
  expect(over("hum/panel/panel.module.test.tsx", LEAK)).toEqual([])
})

test("a server-only file is let through", () => {
  expect(over("hum/.server/held/held.module.code.ts", LEAK)).toEqual([])
})

test("the route table itself is let through", () => {
  expect(refusalsOver([TABLE], asking({ [TABLE]: LEAK }))).toEqual([])
})

test("a file outside every app folder is judged by nothing here", () => {
  expect(refusalsOver(["other/other.module.code.ts"], asking({ [TABLE]: TABLE_TEXT }))).toEqual([])
})

test("the refusal names the line the import sits on", () => {
  const said = over(PLAIN, `const a = 1\n${LEAK}`)
  expect(said[0]).toContain("line 2")
})

test("an app's fixed files are the names the index declares", () => {
  const app = appsIn(asking({}))[0]
  expect(app?.table).toBe(TABLE)
  expect([...(app?.fixed ?? [])].sort()).toEqual([
    "hum/entry.server.tsx",
    "hum/root.tsx",
    "hum/routes/_hum-layout.tsx",
  ])
})

test("a page stating no app layout is given no app layout", () => {
  const value: Value = { slug: "hum", rootRoute: "tsx", routeTable: "ts", serverEntry: "tsx" }
  const app = appsIn(asking({}, { valueAt: () => value }))[0]
  expect([...(app?.fixed ?? [])].sort()).toEqual(["hum/entry.server.tsx", "hum/root.tsx"])
})

test("the route modules are the fixed files and what the table names", () => {
  const app = appsIn(asking({}))[0]
  expect(app === undefined ? [] : [...routesOf(app, asking({ [TABLE]: TABLE_TEXT }))]).toContain(
    ROUTE
  )
})

test("an app whose route table reads as nothing refuses", () => {
  expect(() => refusalsOver([PLAIN], asking({ [PLAIN]: LEAK }))).toThrow("route table")
})

test("an index declaring no route table file name refuses", () => {
  const bare = new Map<string, string | null>()
  expect(() => appsIn(asking({}, { namedFilesOf: () => bare }))).toThrow("route table")
})

test("a router app page the index files that reads as nothing refuses", () => {
  expect(() => appsIn(asking({}, { valueAt: () => null }))).toThrow("router app")
})

test("an index naming no router app judges clean", () => {
  expect(refusalsOver([PLAIN], asking({ [PLAIN]: LEAK }, { appsFiled: () => [] }))).toEqual([])
})

test("a file the change leaves alone is judged by nothing", () => {
  const texts = { [TABLE]: TABLE_TEXT, [PLAIN]: LEAK }
  expect(refusalsOver(["hum/panel/other.module.code.tsx"], asking(texts))).toEqual([])
})

test("every file of an app is judged again where its route table changed", () => {
  const texts = { [TABLE]: TABLE_TEXT, [PLAIN]: LEAK }
  const said = refusalsOver([TABLE], asking(texts))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(PLAIN)
})

test("every file of an app is judged again where its page changed", () => {
  const texts = { [TABLE]: TABLE_TEXT, [PLAIN]: LEAK }
  expect(refusalsOver([PAGE], asking(texts))).toHaveLength(1)
})

test("a module dropped from the table is refused once the table is read again", () => {
  const texts = { [TABLE]: "export default []\n", [ROUTE]: LEAK }
  const said = refusalsOver([TABLE], asking(texts))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(ROUTE)
})

test("a path is passed over where it is a server module, a test or a route", () => {
  const app = appsIn(asking({}))[0]
  const routes = new Set([ROUTE])
  expect(app === undefined ? null : passedOver(ROUTE, app, routes)).toBe(true)
  expect(app === undefined ? null : passedOver(PLAIN, app, routes)).toBe(false)
})

test("a body holding no import reaches nothing", () => {
  expect(reachesIn(PLAIN, "export const a = 1\n")).toEqual([])
})
