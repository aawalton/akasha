import { realpathSync } from "node:fs"
import type {
  Addon,
  Tree,
} from "akasha/check/code/pages/lua-code-compiles/modules/addon-programs/addon-programs.module.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import { tracked } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import {
  type Library,
  matching,
} from "akasha/code/lua-runtime-library/modules/config-claiming/config-claiming.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { nothingFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import { valueAlsoFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"

export const PAGE = "lib/held.lua-runtime-library.ts"

export const CONFIG = "lib/tsconfig.json"

export const LUA50 = "lib/tsconfig.lua50.json"

export const ONE = "lib/src/one.ts"

export const TWO = "lib/src/two.ts"

const LIBRARY_TYPE = "lua-runtime-library"

const SETTINGS = {
  compilerOptions: {
    target: "esnext",
    lib: ["esnext"],
    types: [],
    moduleResolution: "Node",
    module: "esnext",
    strict: true,
  },
  include: ["src/*.ts"],
}

export const CONFIGURED = `${JSON.stringify(SETTINGS)}\n`

export const CLEAN = 'export const one: string = "held"\n'

export const BROKEN = "export const one: string = 1\n"

export const REACHING = 'import { two } from "akasha/lib/src/two"\nexport const one: number = two\n'

export const TWO_BODY = "export const two = 2\n"

const CLAIMS = [matching("lib/src/*.ts")]

export const LIBRARY: Library = {
  page: PAGE,
  configs: [
    { at: CONFIG, claims: CLAIMS },
    { at: LUA50, claims: CLAIMS },
  ],
}

export const ALONE: Library = { page: PAGE, configs: [{ at: CONFIG, claims: CLAIMS }] }

export const scratch = scratchWorld()

export function bodiesOf(
  files: Readonly<Record<string, string>>
): (path: string) => Uint8Array | null {
  return (path) => {
    const said = files[path]
    return said === undefined ? null : new TextEncoder().encode(said)
  }
}

export function librarying(files: Readonly<Record<string, string>>): Record<string, string> {
  return { [CONFIG]: CONFIGURED, [LUA50]: CONFIGURED, ...files }
}

const ADDON_FOLDER = "check/code/pages/lua-code-compiles/held-addon"

export const ENTRY = `${ADDON_FOLDER}/held-entry/held-entry.module.code.ts`

export const FILTER = "check/code/pages/lua-code-compiles/held-filter/held-filter.module.code.ts"

export const HELD_ADDON: Addon = {
  page: `${ADDON_FOLDER}/held-addon.temper-addon.ts`,
  folder: ADDON_FOLDER,
  name: "HeldAddon",
  manifest: `${ADDON_FOLDER}/held-addon.temper-addon.addon-manifest.json`,
  entrySlug: "module/held-entry",
  entry: ENTRY,
  reached: [],
  declaring: [],
}

export const ENTERING = `import { EDITOR } from "akasha/${FILTER}"\n\nexport const held: string = EDITOR.kind\n`

export const ACCESSOR =
  'export const EDITOR = {\n  kind: "multiselect",\n  get options(): readonly string[] {\n    return ["held"]\n  },\n}\n'

export const PROPERTY = 'export const EDITOR = { kind: "multiselect", options: ["held"] }\n'

export type Laid = {
  readonly tree: Tree
  readonly bytes: (path: string) => Uint8Array | null
}

export function laidOver(files: Readonly<Record<string, string>>): Laid {
  const commit = commitIn(codeRoot())
  const read = (path: string): string | null => files[path] ?? commit.read(path)
  const bytes = (path: string): Uint8Array | null => {
    const said = files[path]
    return said === undefined ? commit.bytes(path) : new TextEncoder().encode(said)
  }
  return { tree: { index: commit.index, listed: () => Object.keys(files), read }, bytes }
}

export function rooted(files: Readonly<Record<string, string>>): string {
  const root = realpathSync(scratch.rootFor("lua-code-compiles-"))
  nothingFiled(root)
  valueAlsoFiled(root, LIBRARY_TYPE, [
    { path: PAGE, value: { type: `page-type/${LIBRARY_TYPE}`, slug: "held" } },
  ])
  return tracked(root, librarying(files))
}
