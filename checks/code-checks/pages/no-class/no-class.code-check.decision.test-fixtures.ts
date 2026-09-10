import { valueAlsoFiled } from "@akasha/indexes/testing"
import { ran } from "@akasha/utils/run/running"
import { bodiesIn } from "akasha/testing-system/bodying/bodying.module.code.ts"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { writing } from "../../../../commands/modules/scratching/scratching.module.test-fixtures.ts"
import { founded, typed } from "../../../modules/scratch/check-scratch.module.code.ts"
import { reasonsOver } from "./no-class.code-check.decision.code.ts"

const KIND = "lua-runtime-library"

const LIBRARY_ID = "01a08842-4c6b-7c0e-9d1a-6a2a1c5ee2d1"

export const ROOT = "/repo"

export const LIBRARY = "language-design/lua-compiler/lualib/"

export const LIBRARY_PAGE = `${LIBRARY}held.${KIND}.ts`

export const AT = "akasha/held.ts"

export const DERIVED =
  "  static getDerivedStateFromError(error: Error) {\n    return { error }\n  }\n"

export const given = bodiesIn(ROOT)

export const reasonsIn = reasonsOver([LIBRARY])

export const scratch = scratchWorld()

export function rooted(
  files: Readonly<Record<string, string>>,
  prefix: string = "akasha-no-class-"
): string {
  const root = scratch.rootFor(prefix)
  founded(root)
  typed(root, KIND, "page")
  writing(
    root,
    LIBRARY_PAGE,
    `export const held = { id: "${LIBRARY_ID}", pageTypeSlug: "${KIND}", slug: "held" }\n`
  )
  valueAlsoFiled(root, KIND, [
    { path: LIBRARY_PAGE, value: { id: LIBRARY_ID, pageTypeSlug: KIND, slug: "held" } },
  ])
  for (const [path, body] of Object.entries(files)) writing(root, path, body)
  return root
}

export function tracked(files: Readonly<Record<string, string>>): string {
  const root = rooted(files, "akasha-no-class-audit-")
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
