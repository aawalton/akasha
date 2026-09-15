import { bytesOf } from "akasha/check/test/fixture/bodying/bodying.test-fixture.code.ts"
import {
  edging,
  founded,
  pathFor,
  put,
  typed,
  wrote,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { said as git } from "akasha/git/modules/running/git-running.module.code.ts"
import {
  importFiled,
  pageFilingFrom,
} from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import { scratchWorld } from "akasha/util/fs/modules/scratching/scratching.module.code.ts"

export const AT = "akasha/held.module.code.ts"

export const READER = "akasha/reader.module.code.ts"

export const PROVER = "akasha/held.module.test.ts"

export const FIXTURES_AT = "akasha/held.module.test-fixtures.ts"

export const FIXTURES_CODE_AT = "akasha/held.test-fixture.code.ts"

export const FIXTURES_PROVER = "akasha/held.test-fixture.test.ts"

export const HELD_TEXT = "export const held = 1\nexport const spare = 2\n"

export const KEPT_TEXT =
  "export function held(): number {\n  return 1\n}\n\n" +
  "export function spare(): number {\n  return held()\n}\n"

export const PAGE_AT = pathFor("domain", "held")

export const PAGE_TEXT =
  'export const held = { id: "01a0927a-1000-7001-8000-000000000001",' +
  ' pageTypeSlug: "domain", slug: "held" }\nexport const spare = 2\n'

export const BESIDE_AT = "akasha/held.domain.uncommitted.ts"

export const BESIDE_TEXT =
  'export const heldDomainUncommitted = { "held": 1 } as const\nexport const spare = 2\n'

export const COMMAND_AT = "akasha/held-thing.command.code.ts"

export const COMMAND_TEXT =
  "export function heldThing(): number {\n  return 1\n}\n\nexport const spare = 2\n"

export const SERVICE_AT = "akasha/held.service-workstation.running.code.ts"

export const SERVICE_TEXT = "export const runService = (): number => 1\n\nexport const spare = 2\n"

export const CHECK_AT = "akasha/held-thing.check-code.check.code.ts"

export const CHECK_TEXT = "export const heldThing = (): number => 1\n\nexport const spare = 2\n"

export const RULE_AT = "akasha/held-thing.syntax-rule.code.ts"

export const RULE_TEXT =
  "export const heldThing = (): number => 1\n" +
  "export const mark = (): boolean => true\n\n" +
  "export const spare = 2\n"

export const SHAPE_AT = "akasha/held-thing.folder-shape.code.ts"

export const SHAPE_TEXT =
  "export const heldThing = (): number => 1\n" +
  'export const HOLDS = ["held"]\n\n' +
  "export const spare = 2\n"

export const FORMAT_AT = "akasha/held-thing.name-format.code.ts"

export const FORMAT_TEXT = "export const heldThing = (): number => 1\n\nexport const spare = 2\n"

export const WARRANT_AT = "akasha/held-thing.context-warrant.code.ts"

export const WARRANT_TEXT = "export const heldThing = (): number => 1\n\nexport const spare = 2\n"

export const LOADERLESS_AT = "akasha/held-thing.shell-script.code.ts"

export const LOADERLESS_TEXT =
  "export const heldThing = (): number => 1\n\nexport const spare = 2\n"

export const WRITING_AT = "akasha/held.shell-script.scripting.code.ts"

export const WRITING_TEXT = 'export const bodyIn = (): string => ""\n\nexport const spare = 2\n'

export const SLUGGED_AT = "akasha/carried-file.module.ts"

export const SLUGGED_TEXT =
  'export const carriedFile = { id: "01a0927a-1000-7001-8000-000000000003",' +
  ' pageTypeSlug: "module", slug: "carried-file" }\nexport const spare = 2\n'

export const DRAWING_AT = "akasha/held.page-type.page-component.code.tsx"

export const DRAWING_TEXT = "export const Drawing = (): number => 1\n\nexport const spare = 2\n"

export const GENERATOR_AT = "akasha/held.page-type.type-generator.ts"

export const GENERATOR_TEXT =
  "export const generateTypes = (): number => 1\n" +
  "export const couldTurn = (): number => 2\n\n" +
  "export const spare = 3\n"

export const MODEL_TEST_AT = "akasha/held-thing.model-test.code.ts"

export const MODEL_TEST_TEXT =
  "export const asking = (): number => 1\n" +
  "export const keeping = (): number => 2\n" +
  "export const heldThing = (): number => 3\n\n" +
  "export const spare = 4\n"

export const PERFORMANCE_AT = "akasha/held.performance.code.ts"

export const PERFORMANCE_TEXT =
  "export const measured = (): number => 1\n\nexport const spare = 2\n"

export const MANIFEST_AT = "akasha/held.manifest.code.ts"

export const MANIFEST_TEXT = "export const BUILD_ENV = [] as const\n\nexport const spare = 2\n"

export const WORK_AT = "akasha/held.computed-property.code.ts"

export const WORK_TEXT = "export const work = (): number => 1\n\nexport const spare = 2\n"

export const LUA_AT = "akasha/held.lualib-helper.code.ts"

const LUA_PAGE_AT = "akasha/held.lualib-helper.ts"

const LUA_PAGE_TEXT =
  'export const held = { id: "01a0927a-1000-7001-8000-000000000002",' +
  ' pageTypeSlug: "lualib-helper", slug: "held", luaExport: "__TS__Held" }\n'

export const LUA_TEXT =
  "export function __TS__Held(): number {\n  return 1\n}\n\nexport const spare = 2\n"

export const TUNNEL_AT = "akasha/tunnel-routes.ts"

export const TUNNEL_TEXT = "export const routes = [1]\n\nexport const spare = 2\n"

export const ROOT_AT = "akasha/root.tsx"

export const ROUTE_AT = "akasha/held.route.code.ts"

export const ROUTE_TEXT =
  "export function loader(): number {\n  return 1\n}\n\nexport const spare = 2\n"

export const ROOT_TEXT =
  "export function Layout(): number {\n  return 1\n}\n\nexport const spare = 2\n"

const GROUP = "module-property-group"

const GROUP_SLUG = "scripting"

const GROUP_PAGE_AT = `akasha/${GROUP_SLUG}.${GROUP}.ts`

const WRITER = "code-file-property"

const WRITER_SLUG = "shell"

const WRITER_PAGE_AT = `akasha/${WRITER_SLUG}.${WRITER}.ts`

const WRITES = "file-written-by"

const DRAWING_GROUP = "component-property-group"

const DRAWING_SLUG = "page-component"

const DRAWING_PAGE_AT = `akasha/${DRAWING_SLUG}.${DRAWING_GROUP}.ts`

const MINTED_FROM = "01a0927a-1000-7001-8000-0000000000"

export const scratch = scratchWorld()

export function rooted(): string {
  const root = scratch.rootFor("akasha-unused-exports-")
  founded(root)
  typed(root, "domain", "page")
  typed(root, "module", "domain")
  typed(root, "lualib-helper", "domain")
  typed(root, "command", "domain", [], "module/calling")
  typed(root, "computed-property", "domain")

  typed(root, "service-workstation", "domain")
  typed(root, "test-fixture", "domain")
  typed(root, "check-code", "domain", [], "module/checking")
  typed(root, "syntax-rule", "domain", [], "check-code/no-refused-syntax")
  typed(root, "folder-shape", "domain", [], "check-code/folder-matches-a-shape")
  typed(root, "name-format", "domain", [], "module/format-reaching")
  typed(root, "context-warrant", "domain", [], "module/warranting")
  typed(root, "shell-script", "domain")
  typed(root, "manifest", "domain")
  typed(root, "performance", "domain")
  typed(root, "model-test", "domain")
  typed(root, "page-type", "domain")
  return root
}

export function lualibPaged(root: string): undefined {
  put(root, LUA_PAGE_AT, bytesOf(LUA_PAGE_TEXT))
}

export function grouped(root: string): undefined {
  const filing = pageFilingFrom(root, MINTED_FROM)
  const group = filing(GROUP, GROUP_SLUG, GROUP_PAGE_AT, { pageTypeSlug: GROUP, slug: GROUP_SLUG })
  const writer = filing(WRITER, WRITER_SLUG, WRITER_PAGE_AT, {
    pageTypeSlug: WRITER,
    slug: WRITER_SLUG,
    propertySlug: WRITER_SLUG,
  })
  edging(root, group, WRITES, writer, WRITER_PAGE_AT)
}

export function drawingGrouped(root: string): undefined {
  const filing = pageFilingFrom(root, MINTED_FROM)
  filing(DRAWING_GROUP, DRAWING_SLUG, DRAWING_PAGE_AT, {
    pageTypeSlug: DRAWING_GROUP,
    slug: DRAWING_SLUG,
  })
}

export function importedAt(root: string, at: string, paths: readonly string[]): undefined {
  importFiled(
    root,
    at,
    paths.map((path) => ({ path }))
  )
}

export function importedBy(root: string, paths: readonly string[]): undefined {
  importedAt(root, AT, paths)
}

export const SPELLED = `akasha/${AT}`

export const EVERY_TEXT = `import * as held from "${SPELLED}"\n\nexport const reader = held\n`

export function takenText(taken: string, from: string): string {
  return `import { ${taken} } from "akasha/${from}"\n\nexport const reader = 1\n`
}

export function readerText(taken: string): string {
  return takenText(taken, AT)
}

export function reading(root: string, text: string): undefined {
  put(root, READER, bytesOf(text))
}

export function proving(root: string, text: string): undefined {
  put(root, PROVER, bytesOf(text))
}

export function provingItsOwn(root: string, text: string): undefined {
  put(root, FIXTURES_PROVER, bytesOf(text))
}

export function landed(root: string, files: Readonly<Record<string, string>> = {}): string {
  wrote(root, files)
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "held"])
  return root
}
