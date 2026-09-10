import { indexNamed } from "@akasha/indexes"
import { listedFiled } from "@akasha/indexes/testing"
import { ran } from "@akasha/utils/run/running"
import { bodiesIn } from "akasha/testing-system/bodying/bodying.module.code.ts"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { writing } from "../../../../commands/modules/scratching/scratching.module.test-fixtures.ts"
import { founded, typed } from "../../../modules/scratch/check-scratch.module.code.ts"
import { reasonsOver } from "./no-index-path-spelled.code-check.decision.code.ts"

export const ROOT = "/repo"

export const AT = indexNamed()

export const HELD = "akasha/command-system/held.module.code.ts"

export const PAGE = "akasha/command-system/held.module.ts"

export const PAGE_TYPES: ReadonlySet<string> = new Set(["module"])

export const INDEXES = "pages/indexes/"

export const OWNED = `${INDEXES}reading/index-reading.module.code.ts`

export const given = bodiesIn(ROOT)

export const reasonsIn = reasonsOver(INDEXES, PAGE_TYPES)

export const scratch = scratchWorld()

const PACKAGE_AT = `${INDEXES}index.workspace-package.ts`

const PACKAGE_ID = "01a08850-6d1a-7c44-8f21-4a7b2e9c0d63"

export function rooted(
  files: Readonly<Record<string, string>>,
  prefix: string = "akasha-no-index-path-"
): string {
  const root = scratch.rootFor(prefix)
  founded(root)
  typed(root, "module", "page")
  typed(root, "workspace-package", "page")
  listedFiled(root, "workspace-package", "index", [{ path: PACKAGE_AT, id: PACKAGE_ID }])
  writing(
    root,
    PACKAGE_AT,
    `export const held = { id: "${PACKAGE_ID}", pageTypeSlug: "workspace-package",` +
      ' slug: "index" }\n'
  )
  for (const [path, body] of Object.entries(files)) writing(root, path, body)
  return root
}

export function tracked(files: Readonly<Record<string, string>>): string {
  const root = rooted(files, "akasha-no-index-path-audit-")
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
