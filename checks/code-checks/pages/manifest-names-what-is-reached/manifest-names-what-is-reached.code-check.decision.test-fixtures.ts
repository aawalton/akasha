import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { listingFiled, valueAlsoFiled } from "@akasha/indexes/testing"
import { ran } from "@akasha/utils/run/running"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { declaring, founded, typed } from "../../../modules/scratch/check-scratch.module.code.ts"
import {
  declaringIn,
  type Named,
  type Reach,
} from "./manifest-names-what-is-reached.code-check.decision.code.ts"

export const PACKAGE = "workspace-package"

export const FOLDER = "akasha/one-system"

export const AT = `${FOLDER}/one/one.module.code.ts`

export const MANIFEST_AT = `${FOLDER}/package.json`

export const PAGE_AT = `${FOLDER}/one-system.workspace-package.ts`

export const STYLE_AT = `${FOLDER}/one/one.stylesheet.styles.css`

export const HELD = "export const held = 1\n"

export const NOTHING: Reach = { packages: new Set(), protocols: new Set() }

export const NO_TOOL: ReadonlySet<string> = new Set()

export const ALONE: ReadonlyMap<string, Named> = new Map()

export const NONE: ReadonlySet<string> = new Set()

const ID = "01a0597b-0000-7000-8000-00000000000a"

const MANIFEST_KEY = "manifest"

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
  typed(root, PACKAGE, "page")
  declaring(root, MANIFEST_KEY, { pageTypeSlug: FILE_PROPERTY, fileName: "package.json" })
  valueAlsoFiled(root, PACKAGE, [
    { path: PAGE_AT, value: { id: ID, pageTypeSlug: PACKAGE, slug: "one-system" } },
  ])
  listingFiled(root, [PAGE_AT, MANIFEST_AT, AT])
  return root
}

export function wrote(root: string, files: Readonly<Record<string, string>>): string {
  for (const [path, body] of Object.entries(files)) {
    const at = join(root, path)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, body)
  }
  return root
}

export function tracked(files: Readonly<Record<string, string>>): string {
  const root = wrote(rooted("akasha-reached-audit-"), files)
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
