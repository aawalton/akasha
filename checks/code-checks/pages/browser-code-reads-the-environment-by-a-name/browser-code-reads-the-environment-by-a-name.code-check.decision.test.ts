import { expect, test } from "bun:test"
import {
  type Asking,
  appsIn,
  exportsIn,
  landedAt,
  passedOver,
  reachesByKey,
  refusalsOver,
  routesOf,
  servedAlone,
} from "akasha/checks/code-checks/pages/browser-code-reads-the-environment-by-a-name/browser-code-reads-the-environment-by-a-name.code-check.decision.code.ts"
import { parsedAs } from "akasha/code-system/code-source/code-source.module.code.ts"

const PAGE = "held-web/held-web.router-app.ts"

const TABLE = "held-web/routes.ts"

const ROOTED = "held-web/root.tsx"

const PANEL = "held-web/panel/panel.module.code.tsx"

const ROUTE = "held-web/routes/home.tsx"

const HELPER = "held-utils/env.module.code.ts"

const NAMED = new Map<string, string | null>([
  ["route-table", "routes.ts"],
  ["root-route", "root.tsx"],
  ["server", "server.ts"],
  ["server-entry", "entry.server.tsx"],
  ["vite-config", "vite.config.ts"],
  ["router-config", "react-router.config.ts"],
])

const EVERY = [
  PAGE,
  TABLE,
  ROOTED,
  PANEL,
  ROUTE,
  HELPER,
  "held-web/server.ts",
  "held-web/vite.config.ts",
  "held-web/entry.server.tsx",
  "held-web/held.server.ts",
  "held-web/.server/held/held.module.code.ts",
  "held-web/panel/panel.module.test.tsx",
]

const TABLE_TEXT = 'export default [route("home", "routes/home.tsx")]\n'

const HELPER_TEXT =
  "export function held(name: string): string | undefined {\n  return process.env[name]\n}\n"

const KEYED = 'const NAME = "NEXT_PUBLIC_BUILD_SHA"\nexport const sha = process.env[NAME]\n'

const WRITTEN = "export const sha = process.env.NEXT_PUBLIC_BUILD_SHA\n"

const REACHES =
  'import { held } from "../../held-utils/env.module.code.ts"\nexport const sha = held("A")\n'

const UNDER_A_NAME =
  'import { held } from "akasha/held-utils/env.module.code.ts"\nexport const sha = held("A")\n'

const TYPED =
  'import type { Held } from "../../held-utils/env.module.code.ts"\nexport const sha = 1\n'

const LOADER_ALONE = "export function loader(): Response {\n  return Response.json({})\n}\n"

const LOADER_KEYED =
  'const NAME = "A"\nexport function loader(): Response {\n  return Response.json(process.env[NAME])\n}\n'

const PAST_ITS_LOADER = `${LOADER_KEYED}export default function Home() {\n  return null\n}\n`

const NAMED_IN_LOADER =
  "export function loader(): Response {\n  return Response.json(process.env.NEXT_PUBLIC_BUILD_SHA)\n}\n"

const NAMED_INSIDE_A_LOADER_PAST_IT = `${NAMED_IN_LOADER}export function meta() {\n  return []\n}\nexport default function Home() {\n  return null\n}\n`

function asking(texts: Readonly<Record<string, string>>, given?: Partial<Asking>): Asking {
  return {
    appsFiled: () => [PAGE],
    namedFilesOf: () => NAMED,
    everyPath: () => EVERY,
    textAt: (path) => texts[path] ?? null,
    ...given,
  }
}

function over(path: string, text: string): readonly string[] {
  const texts = { [TABLE]: TABLE_TEXT, [HELPER]: HELPER_TEXT, [path]: text }
  return refusalsOver([path], asking(texts)).map((one) => one.reason)
}

test("a keyed reach in a package file is refused", () => {
  const said = over(PANEL, KEYED)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("by a key")
})

test("a name written out in full is let through", () => {
  expect(over(PANEL, WRITTEN)).toEqual([])
})

test("an import reaching a module that reads by a key is refused", () => {
  const said = over(PANEL, REACHES)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain(HELPER)
})

test("that import is followed where the specifier opens with a package name", () => {
  expect(over(PANEL, UNDER_A_NAME)).toHaveLength(1)
})

test("an import carrying only a type reaches nothing", () => {
  expect(over(PANEL, TYPED)).toEqual([])
})

test("a route module exporting its loader alone is let through", () => {
  expect(over(ROUTE, LOADER_KEYED)).toEqual([])
})

test("a route module exporting past its loader is judged", () => {
  expect(over(ROUTE, PAST_ITS_LOADER)).toHaveLength(1)
})

test("a route module exporting its loader alone is clean where that loader reads a name", () => {
  expect(over(ROUTE, NAMED_IN_LOADER)).toEqual([])
})

test("a route module past its loader is clean where the name is read inside that loader", () => {
  expect(over(ROUTE, NAMED_INSIDE_A_LOADER_PAST_IT)).toEqual([])
})

test("a module outside every app folder is clean where it reads a name", () => {
  expect(refusalsOver([HELPER], asking({ [TABLE]: TABLE_TEXT, [HELPER]: WRITTEN }))).toEqual([])
})

test("the root route is judged", () => {
  expect(over(ROOTED, KEYED)).toHaveLength(1)
})

test("a file under a `.server` folder is let through", () => {
  expect(over("held-web/.server/held/held.module.code.ts", KEYED)).toEqual([])
})

test("a file whose name ends `.server` is let through", () => {
  expect(over("held-web/held.server.ts", KEYED)).toEqual([])
})

test("the listener the package serves on is let through", () => {
  expect(over("held-web/server.ts", KEYED)).toEqual([])
})

test("the bundler's own configuration is let through", () => {
  expect(over("held-web/vite.config.ts", KEYED)).toEqual([])
})

test("a test file is let through", () => {
  expect(over("held-web/panel/panel.module.test.tsx", KEYED)).toEqual([])
})

test("a file outside every app folder is judged by nothing here", () => {
  expect(refusalsOver([HELPER], asking({ [TABLE]: TABLE_TEXT, [HELPER]: HELPER_TEXT }))).toEqual([])
})

test("the refusal names the line the reach sits on", () => {
  expect(over(PANEL, `const a = 1\n${KEYED}`)[0]).toContain("line 3")
})

test("an app whose route table reads as nothing refuses", () => {
  expect(() => refusalsOver([PANEL], asking({ [PANEL]: KEYED }))).toThrow("route table")
})

test("an index declaring no route table file name refuses", () => {
  const bare = new Map<string, string | null>()
  expect(() => appsIn(asking({}, { namedFilesOf: () => bare }))).toThrow("route table")
})

test("an index naming no router app judges clean", () => {
  expect(refusalsOver([PANEL], asking({ [PANEL]: KEYED }, { appsFiled: () => [] }))).toEqual([])
})

test("every file of an app is judged again where its route table changed", () => {
  const texts = { [TABLE]: TABLE_TEXT, [HELPER]: HELPER_TEXT, [PANEL]: KEYED }
  const said = refusalsOver([TABLE], asking(texts))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(PANEL)
})

test("a body with no keyed reach in its text reads by no key", () => {
  expect(reachesByKey(HELPER, WRITTEN)).toBe(false)
  expect(reachesByKey(HELPER, HELPER_TEXT)).toBe(true)
})

test("the files an app's build and its listener use are read from the index", () => {
  const app = appsIn(asking({}))[0]
  expect([...(app?.apart ?? [])].sort()).toEqual([
    "held-web/entry.server.tsx",
    "held-web/react-router.config.ts",
    "held-web/routes.ts",
    "held-web/server.ts",
    "held-web/vite.config.ts",
  ])
})

test("the route modules are the root route and what the table names", () => {
  const app = appsIn(asking({}))[0]
  const found = app === undefined ? [] : [...routesOf(app, asking({ [TABLE]: TABLE_TEXT }))]
  expect(found.sort()).toEqual([ROOTED, ROUTE])
})

test("a path is passed over where it is server-only, a test or the build's own", () => {
  const app = appsIn(asking({}))[0]
  expect(app === undefined ? null : passedOver("held-web/server.ts", app)).toBe(true)
  expect(app === undefined ? null : passedOver(PANEL, app)).toBe(false)
})

test("a value re-export makes a route module more than its loader", () => {
  const source = parsedAs(ROUTE, `${LOADER_ALONE}export { held } from "./held.ts"\n`)
  expect(servedAlone(source)).toBe(false)
})

test("a type alias beside a loader leaves that route module its loader alone", () => {
  const source = parsedAs(ROUTE, `export type Held = string\n${LOADER_ALONE}`)
  expect(exportsIn(source)).toEqual(["loader"])
  expect(servedAlone(source)).toBe(true)
})

test("a specifier landing nowhere the index files reaches nothing", () => {
  expect(landedAt(PANEL, "./nowhere.ts", (at) => EVERY.includes(at))).toBe(null)
  expect(landedAt(PANEL, "../../held-utils/env.module.code.ts", (at) => EVERY.includes(at))).toBe(
    HELPER
  )
})
