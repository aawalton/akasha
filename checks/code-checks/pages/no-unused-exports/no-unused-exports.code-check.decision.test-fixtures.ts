import {
  founded,
  pathFor,
  put,
  typed,
} from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import {
  importFiled,
  noImportersFiled,
} from "akasha/pages/indexes/modules/reading/index-reading.module.test-fixtures.ts"
import { bytesOf } from "akasha/testing-system/modules/bodying/bodying.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/modules/scratching/scratching.module.code.ts"

export const AT = "akasha/held.module.code.ts"

export const READER = "akasha/reader.module.code.ts"

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

export const GUARD_AT = "akasha/held.change-guard.code.ts"

export const GUARD_TEXT = "export const runGuard = (): number => 1\n\nexport const spare = 2\n"

export const CHECK_AT = "akasha/held-thing.code-check.check.code.ts"

export const CHECK_TEXT = "export const heldThing = (): number => 1\n\nexport const spare = 2\n"

export const PERFORMANCE_AT = "akasha/held.performance.code.ts"

export const PERFORMANCE_TEXT =
  "export const measured = (): number => 1\n\nexport const spare = 2\n"

export const MANIFEST_AT = "akasha/held.manifest.code.ts"

export const MANIFEST_TEXT = "export const BUILD_ENV = [] as const\n\nexport const spare = 2\n"

export const WORK_AT = "akasha/held.computed-property.code.ts"

export const WORK_TEXT = "export const work = (): number => 1\n\nexport const spare = 2\n"

export const LUA_AT = "akasha/held.lualib.code.ts"

const LUA_PAGE_AT = "akasha/held.lualib.ts"

const LUA_PAGE_TEXT =
  'export const held = { id: "01a0927a-1000-7001-8000-000000000002",' +
  ' pageTypeSlug: "lualib", slug: "held", luaExport: "__TS__Held" }\n'

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

export const scratch = scratchWorld()

export function rooted(): string {
  const root = scratch.rootFor("akasha-unused-exports-")
  founded(root)
  typed(root, "domain", "page")
  typed(root, "lualib", "domain")
  typed(root, "command", "domain")
  typed(root, "computed-property", "domain")
  typed(root, "change-guard", "domain")
  typed(root, "code-check", "domain")
  typed(root, "manifest", "domain")
  typed(root, "performance", "domain")
  noImportersFiled(root)
  return root
}

export function lualibPaged(root: string): undefined {
  put(root, LUA_PAGE_AT, bytesOf(LUA_PAGE_TEXT))
}

export function importedBy(root: string, paths: readonly string[]): undefined {
  importFiled(
    root,
    AT,
    paths.map((path) => ({ path }))
  )
}

export const SPELLED = `akasha/${AT}`

export const EVERY_TEXT = `import * as held from "${SPELLED}"\n\nexport const reader = held\n`

export function readerText(taken: string): string {
  return `import { ${taken} } from "${SPELLED}"\n\nexport const reader = 1\n`
}

export function reading(root: string, text: string): undefined {
  put(root, READER, bytesOf(text))
}
