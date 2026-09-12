import { reasonsOver } from "akasha/checks/code-checks/pages/no-index-path-spelled/no-index-path-spelled.code-check.decision.code.ts"
import { founded, typed } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { listedFiled } from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { indexNamed } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { bodiesIn } from "akasha/testing-system/modules/bodying/bodying.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"
import { writing } from "akasha/utils/fs/scratching/scratching.module.test-fixtures.ts"
import { ran } from "akasha/utils/run/running/running.module.code.ts"

export const ROOT = "/repo"

export const AT = indexNamed()

export const HELD = "akasha/command-system/held.module.code.ts"

export const PAGE = "akasha/command-system/held.module.ts"

const PAGE_TYPES: ReadonlySet<string> = new Set(["module"])

export const INDEXES = "pages/indexes/"

export const OWNED = `${INDEXES}reading/index-reading.module.code.ts`

export const given = bodiesIn(ROOT)

export const reasonsIn = reasonsOver(INDEXES, PAGE_TYPES)

export const scratch = scratchWorld()

const TYPED_AT = `${INDEXES}index.page-type.ts`

const TYPED_ID = "01a08850-6d1a-7c44-8f21-4a7b2e9c0d63"

export function rooted(
  files: Readonly<Record<string, string>>,
  prefix: string = "akasha-no-index-path-"
): string {
  const root = scratch.rootFor(prefix)
  founded(root)
  typed(root, "module", "page")
  typed(root, "page-type", "page")
  listedFiled(root, "page-type", "index", [{ path: TYPED_AT, id: TYPED_ID }])
  writing(
    root,
    TYPED_AT,
    `export const held = { id: "${TYPED_ID}", pageTypeSlug: "page-type", slug: "index" }\n`
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
