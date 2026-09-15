import {
  claiming,
  founded,
  typed,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"
import { listedFiled } from "akasha/page/index/modules/filing/index-filing.module.code.ts"

export const AT = "akasha/held.ts"

const PAGE_AT = "akasha/one/held.module.ts"

export const CODE_AT = "akasha/one/held.module.code.ts"

export const SPELLING = 'const at = "/tmp/held"\n'

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
  claiming(root, PAGE_AT, HELD_ID)
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
