import {
  declaringIn,
  type Named,
  type Reach,
} from "akasha/check/code/pages/manifest-names-what-is-reached/manifest-names-what-is-reached.check-code.decision.code.ts"
import {
  declaring,
  founded,
  typed,
  wrote,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/page/index/modules/filing/index-filing.module.code.ts"

const WORKSPACE = "workspace"

export const FOLDER = "akasha/one-system"

export const AT = `${FOLDER}/one/one.module.code.ts`

export const MANIFEST_AT = `${FOLDER}/package.json`

const PAGE_AT = `${FOLDER}/one-system.workspace.ts`

export const STYLE_AT = `${FOLDER}/one/one.stylesheet.styles.css`

export const HELD = "export const held = 1\n"

export const NOTHING: Reach = { packages: new Set(), protocols: new Set() }

export const NO_TOOL: ReadonlySet<string> = new Set()

export const ALONE: ReadonlyMap<string, Named> = new Map()

export const NONE: ReadonlySet<string> = new Set()

const ID = "01a0597b-0000-7000-8000-00000000000a"

const MANIFEST_KEY = "workspace-manifest"

const FILE_PROPERTY = "file-property"

export const scratch = scratchWorld()

export function reaching(...every: readonly string[]): Reach {
  return { packages: new Set(every), protocols: new Set() }
}

export function thereOf(...every: readonly string[]): (one: string) => boolean {
  return (one) => every.includes(one)
}

export function named(held: Record<string, unknown>): Named {
  const said = declaringIn(FOLDER, MANIFEST_AT, JSON.stringify(held))
  if (said === null) throw new Error("the manifest would not parse")
  return said
}

export function manifest(value: Readonly<Record<string, unknown>>): string {
  return JSON.stringify({ name: "@akasha/one", ...value })
}

export function rooted(prefix: string = "akasha-reached-"): string {
  const root = scratch.rootFor(prefix)
  founded(root)
  typed(root, WORKSPACE, "page")
  declaring(root, MANIFEST_KEY, { pageTypeSlug: FILE_PROPERTY, fileName: "package.json" })
  listedFiled(root, WORKSPACE, "one-system", [{ path: PAGE_AT, id: ID }])
  valueAlsoFiled(root, WORKSPACE, [
    { path: PAGE_AT, value: { id: ID, pageTypeSlug: WORKSPACE, slug: "one-system" } },
  ])
  return root
}

export function tracked(files: Readonly<Record<string, string>>): string {
  const root = wrote(rooted("akasha-reached-audit-"), files)
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
