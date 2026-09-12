import { reasonsOver } from "akasha/checks/code-checks/pages/no-class/no-class.code-check.decision.code.ts"
import { founded, typed } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { bodiesIn } from "akasha/testing-system/bodying/bodying.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"
import { writing } from "akasha/utils/fs/scratching/scratching.module.test-fixtures.ts"
import { ran } from "akasha/utils/run/running/running.module.code.ts"

const KIND = "lua-runtime-library"

const LIBRARY_ID = "01a08842-4c6b-7c0e-9d1a-6a2a1c5ee2d1"

export const ROOT = "/repo"

export const LIBRARY = "design/language/lua-compiler/lualib/"

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
  listedFiled(root, KIND, "held", [{ path: LIBRARY_PAGE, id: LIBRARY_ID }])
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
