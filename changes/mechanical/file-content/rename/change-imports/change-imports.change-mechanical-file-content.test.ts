import { expect, test } from "bun:test"
import {
  changeImports,
  changeRuns,
  type Landing,
  runChange,
} from "akasha/changes/mechanical/file-content/rename/change-imports/change-imports.change-mechanical-file-content.code.ts"
import {
  CONFIG,
  IMAGES,
  LOOK,
  RECIPES,
  ROOTS,
  ROOTS_AT,
  ROOTS_MOVED,
  SERVICE,
  SHELL,
  TOKENS,
  TOKENS_AT,
  TOKENS_IMPORT,
  TOKENS_IMPORT_AT,
  WATCHER,
  WATCHER_AT,
  WRAPPED,
  WRAPPED_AT,
} from "akasha/changes/mechanical/file-content/rename/change-imports/change-imports.change-mechanical-file-content.test-fixtures.ts"
import { gathered } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  bodyOf,
  worldOf,
} from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"
import {
  ARRIVES,
  CODE,
  HOLDER,
  TARGET,
} from "akasha/testing-system/page-holding/page-holding.module.code.ts"

const TABLE = "akasha/one/routes.ts"

const ALIAS = "@akasha/two/other"

const ROOTED = "akasha/two/other.module.code.ts"

const ROOTED_AT = "akasha/four/other.module.code.ts"

const ROOT_MOVED = new Map([["two/other.module.code.ts", "four/other.module.code.ts"]])

const TYPED_ROUTE = "akasha/one/routes/api.addons.download.ts"

const TYPED_ROUTE_AT = "akasha/one/routes/addon-parcel/addon-parcel.route.code.ts"

const TYPED_CODE = `import type { Route } from "./+types/api.addons.download"

export const it: Route | null = null
`

const TYPED_FOLLOWED = `import type { Route } from "./+types/addon-parcel.route.code"

export const it: Route | null = null
`

function by(moved: ReadonlyMap<string, string>): Landing {
  return (path) => moved.get(path) ?? null
}

function ranOn(was: string, now: string, text: string, moved: ReadonlyMap<string, string>): Answer {
  return gathered([changeImports(was, now, text, by(moved))])
}

function bodyIn(
  was: string,
  now: string,
  text: string,
  moved: ReadonlyMap<string, string>
): string {
  return bodyOf(ranOn(was, now, text, moved), (path) => (path === now ? text : null))
}

test("a specifier reaching a file that moves in the same act reaches its new path", () => {
  const moved = new Map([[TARGET, ARRIVES]])
  const said = bodyIn(HOLDER, HOLDER, CODE, moved)
  expect(said).toContain('from "../four/other.module.code.ts"')
  expect(said).toContain('import ts from "typescript"')
})

test("a body naming nothing that moved is answered as no edit", () => {
  expect(ranOn(HOLDER, HOLDER, CODE, new Map()).edits).toEqual([])
})

test("a body that does not move states a replace rather than a move", () => {
  const said = changeImports(HOLDER, HOLDER, CODE, by(new Map([[TARGET, ARRIVES]])))

  expect(said.edits).toHaveLength(1)
  expect(said.edits[0]).toMatchObject({ kind: "replace", path: HOLDER })
})

test("the passage a repointed import names is the line rather than the body", () => {
  const said = changeImports(HOLDER, HOLDER, CODE, by(new Map([[TARGET, ARRIVES]])))
  const one = said.edits[0]

  expect(one?.kind === "replace" && one.contentFrom).toBe(
    'import { other } from "../two/other.module.code.ts"'
  )
})

test("a name that is no specifier is read against the folder of the body naming it", () => {
  const moved = new Map([["akasha/one/two/held.ts", "akasha/one/three/held.ts"]])
  const text = `export const at = "two/held.ts"\n`
  expect(bodyIn(TABLE, TABLE, text, moved)).toBe(`export const at = "three/held.ts"\n`)
})

test("a name landing on nothing that moved, and one holding no slash, are left alone", () => {
  const moved = new Map([[TARGET, ARRIVES]])
  const text = `export const said = ["two/other.module.code.ts", "other.module.code.ts"]\n`
  expect(ranOn(TABLE, TABLE, text, moved).edits).toEqual([])
})

test("a name a body imports is read as a package however that name would resolve", () => {
  const moved = new Map([["akasha/one/two/other.module.code.ts", "akasha/one/three/held.ts"]])
  const text = `import { other } from "two/other.module.code.ts"\n\nexport const held = other\n`
  expect(ranOn(HOLDER, HOLDER, text, moved).edits).toEqual([])
})

test("a body's import of its own generated types follows that body's folder and name", () => {
  const moved = new Map([[TYPED_ROUTE, TYPED_ROUTE_AT]])
  expect(bodyIn(TYPED_ROUTE, TYPED_ROUTE_AT, TYPED_CODE, moved)).toBe(TYPED_FOLLOWED)
})

test("a body landing elsewhere is answered at the path the carry left it at", () => {
  const moved = new Map([[TYPED_ROUTE, TYPED_ROUTE_AT]])
  const said = ranOn(TYPED_ROUTE, TYPED_ROUTE_AT, TYPED_CODE, moved)

  expect(said.edits.map((one) => one.kind)).toEqual(["replace"])
  expect(said.edits[0]).toMatchObject({ kind: "replace", path: TYPED_ROUTE_AT })
})

test("a body moving under the name it has keeps the types specifier it already spells", () => {
  const was = "akasha/one/routes/keep.ts"
  const now = "akasha/one/routes/under/keep.ts"
  const text = `import type { Route } from "./+types/keep"\n`

  const said = changeImports(was, now, text, by(new Map([[was, now]])))

  expect(said.edits).toEqual([])
})

test("a specifier naming a package is left alone though the file it reaches moved", () => {
  const text = `import { other } from "${ALIAS}"\n\nexport const held = other\n`

  const said = changeImports(HOLDER, HOLDER, text, by(new Map([[TARGET, ARRIVES]])))

  expect(said.edits).toEqual([])
})

test("a package name a body spells outside an import is left alone too", () => {
  const text = `export const at = "${ALIAS}"\n`

  const said = changeImports(TABLE, TABLE, text, by(new Map([[TARGET, ARRIVES]])))

  expect(said.edits).toEqual([])
})

test("a specifier spelled from the root package follows the file that moved", () => {
  const text = `import { other } from "${ROOTED}"\n\nexport const held = other\n`

  expect(bodyIn(HOLDER, HOLDER, text, ROOT_MOVED)).toContain(`from "${ROOTED_AT}"`)
})

test("a root-spelled name outside an import follows what moved too", () => {
  const text = `export const at = "${ROOTED}"\n`

  expect(bodyIn(TABLE, TABLE, text, ROOT_MOVED)).toBe(`export const at = "${ROOTED_AT}"\n`)
})

test("a root-spelled name landing on nothing that moved is left alone", () => {
  const text = `export const at = "${ROOTED}"\n`

  expect(ranOn(TABLE, TABLE, text, new Map()).edits).toEqual([])
})

function ranOverRuns(
  was: string,
  now: string,
  text: string,
  moved: ReadonlyMap<string, string>
): Answer {
  return gathered([changeRuns(was, now, text, by(moved))])
}

function runBodyIn(
  was: string,
  now: string,
  text: string,
  moved: ReadonlyMap<string, string>
): string {
  return bodyOf(ranOverRuns(was, now, text, moved), (path) => (path === now ? text : null))
}

test("a shell script naming a path from the root follows the file that moved", () => {
  const text = `. "$REPO/${ROOTS}"\n`

  expect(runBodyIn(SHELL, SHELL, text, ROOTS_MOVED)).toBe(`. "$REPO/${ROOTS_AT}"\n`)
})

test("a bare path from the root in a body that is no code follows the file that moved", () => {
  const text = `wrapping: "${WRAPPED}"\n`

  expect(runBodyIn(SERVICE, SERVICE, text, new Map([[WRAPPED, WRAPPED_AT]]))).toBe(
    `wrapping: "${WRAPPED_AT}"\n`
  )
})

test("a manifest's way in follows the file that moved", () => {
  const was = "commands/akasha/akasha.command.code.ts"
  const now = "cli/akasha/akasha.command.code.ts"
  const text = `{\n  "main": "${was}"\n}\n`

  expect(runBodyIn("package.json", "package.json", text, new Map([[was, now]]))).toBe(
    `{\n  "main": "${now}"\n}\n`
  )
})

test("a stylesheet naming a file beside it is respelled from where the body sits", () => {
  expect(runBodyIn(LOOK, LOOK, TOKENS_IMPORT, new Map([[TOKENS, TOKENS_AT]]))).toBe(
    TOKENS_IMPORT_AT
  )
})

test("a config naming a file by climbing follows that file", () => {
  const was = "alan/harness/code-editor/data-interfaces/pages/work-tree/work-tree.d.ts"
  const now = "alan/harness/code-editor/interfaces/work-tree/work-tree.d.ts"
  const text = `{ "files": ["../../../${was}"] }\n`

  expect(runBodyIn(CONFIG, CONFIG, text, new Map([[was, now]]))).toBe(
    `{ "files": ["../../../${now}"] }\n`
  )
})

test("a run naming as many files that moved as it shares an ending with is left alone", () => {
  const text = `  podman build -f "$PKG_DIR/image/Containerfile" "$PKG_DIR"\n`

  expect(ranOverRuns(RECIPES, RECIPES, text, IMAGES).edits).toEqual([])
})

test("a run naming a folder rather than a whole path is left alone", () => {
  const text = `@source "../../../pages/ui/**/*.{ts,tsx}";\n`
  const moved = new Map([["pages/ui/held/held.component.code.tsx", "pages/parts/held.code.tsx"]])

  expect(ranOverRuns(LOOK, LOOK, text, moved).edits).toEqual([])
})

test("a relative run landing on nothing that moved is left alone though the body moved", () => {
  expect(
    ranOverRuns(
      WATCHER,
      WATCHER_AT,
      `COPY ./src/main.rs ./src/main.rs\n`,
      new Map([[WATCHER, WATCHER_AT]])
    ).edits
  ).toEqual([])
})

test("a body that is code is read by the parser rather than as runs", () => {
  const moved = new Map([[TYPED_ROUTE, TYPED_ROUTE_AT]])

  expect(bodyIn(TYPED_ROUTE, TYPED_ROUTE_AT, TYPED_CODE, moved)).toBe(TYPED_FOLLOWED)
  expect(ranOverRuns(TYPED_ROUTE, TYPED_ROUTE_AT, TYPED_CODE, moved).edits).toEqual([])
})

const MOVING = { from: "code-system", to: "code" }

const STYLES = "held/web/look/held-web-look.stylesheet.styles.css"

const SOURCED = `@source "../../../code-system/router-apps/**/*.{ts,tsx}";\n`

const SOURCED_AT = `@source "../../../code/router-apps/**/*.{ts,tsx}";\n`

const SCRIPT = "code-system/ios-apps/scripts/stage.shell-script.sh"

const RAN = `. "$AKASHA_ROOT/code-system/ios-apps/stage/stage.module.code.ts"\n`

const RAN_AT = `. "$AKASHA_ROOT/code/ios-apps/stage/stage.module.code.ts"\n`

function carriedOver(at: string, text: string): Answer {
  return gathered([runChange(worldOf({ [at]: text }), { was: at, now: at, carried: MOVING })])
}

function carriedBody(at: string, text: string): string {
  return bodyOf(carriedOver(at, text), (path) => (path === at ? text : null))
}

test("a run naming the folder that moved rather than a whole path follows that folder", () => {
  expect(carriedBody(STYLES, SOURCED)).toBe(SOURCED_AT)
})

test("a run closing on a separator keeps that separator once the folder moves", () => {
  expect(carriedBody(STYLES, SOURCED)).toContain("router-apps/**")
})

test("a run reached through a shell variable follows the folder that moved", () => {
  expect(carriedBody(SCRIPT, RAN)).toBe(RAN_AT)
})

test("a page address opening with the folder's name is left alone", () => {
  const text = `export const one = { domain: "domain/code-system" } as const\n`

  expect(carriedOver(TABLE, text).edits).toEqual([])
})

test("a name with no separator is no path naming the folder that moved", () => {
  const text = `const MOVED = "code-system"\n`

  expect(carriedOver(TABLE, text).edits).toEqual([])
})

test("a name opening with the folder's letters but not at a separator is left alone", () => {
  const text = `export const at = "code-systems/one.module.code.ts"\n`

  expect(carriedOver(TABLE, text).edits).toEqual([])
})

test("a specifier spelled from the root under the folder that moved follows it", () => {
  const text = `import { one } from "akasha/code-system/one/one.module.code.ts"\n`

  expect(carriedBody(TABLE, text)).toBe(
    `import { one } from "akasha/code/one/one.module.code.ts"\n`
  )
})
