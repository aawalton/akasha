import {
  claiming,
  founded,
  typed,
} from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { listedFiled } from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { bodiesIn } from "akasha/testing-system/modules/bodying/bodying.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"
import { writing } from "akasha/utils/fs/scratching/scratching.module.test-fixtures.ts"
import { ran } from "akasha/utils/run/running/running.module.code.ts"

export const ROOT = "/repo"

export const AT = "akasha/held.ts"

const PAGE_AT = "akasha/one/held.module.ts"

export const CODE_AT = "akasha/one/held.module.code.ts"

export const SPELLING = 'const at = "/tmp/held"\n'

export const given = bodiesIn(ROOT)

export const scratch = scratchWorld()

const MODULE = "module"

const HELD_ID = "01a04ecb-5cd1-7000-8159-000000000001"

export function rooted(
  files: Readonly<Record<string, string>>,
  prefix: string = "akasha-no-tmp-",
  allows: boolean = false
): string {
  const root = scratch.rootFor(prefix)
  founded(root)
  typed(root, MODULE, "page")
  listedFiled(root, MODULE, "held", [{ path: PAGE_AT, id: HELD_ID }])
  claiming(root, PAGE_AT, PAGE_AT, HELD_ID)
  claiming(root, CODE_AT, PAGE_AT, HELD_ID)
  const said = allows ? ", allowsTmpPaths: true" : ""
  const stated = `id: ${JSON.stringify(HELD_ID)}, pageTypeSlug: ${JSON.stringify(MODULE)}`
  writing(root, PAGE_AT, `export const held = { ${stated}, slug: "held"${said} }\n`)
  for (const [path, body] of Object.entries(files)) writing(root, path, body)
  return root
}

export function tracked(files: Readonly<Record<string, string>>): string {
  const root = rooted(files, "akasha-no-tmp-audit-")
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
