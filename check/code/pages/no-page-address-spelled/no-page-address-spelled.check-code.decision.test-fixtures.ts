import {
  found,
  type Judging,
} from "akasha/check/code/pages/no-page-address-spelled/no-page-address-spelled.check-code.decision.code.ts"
import {
  type Body,
  overEachText,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import { bodiesIn } from "akasha/check/test/fixture/bodying/bodying.test-fixture.code.ts"
import {
  filing,
  founded,
  typed,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"

export const ROOT = "/repo"

export const HELD = "akasha/command-system/held.module.code.ts"

export const PAGE = "akasha/command-system/held.module.ts"

export const UNCOMMITTED = "akasha/command-system/held.module.uncommitted.ts"

export const GENERATED = "akasha/command-system/held.module.types.ts"

export const ADDRESS = "module/held"

export const SCOPED = "page-property/module/code"

const PAGE_TYPES: ReadonlySet<string> = new Set(["module", "page-type", "page-property"])

const LISTED: ReadonlySet<string> = new Set([ADDRESS, "page-type/module", "page-property/code"])

export const JUDGING: Judging = {
  pageTypes: PAGE_TYPES,
  generated: (path) => path === GENERATED,
  listed: (pageTypeSlug, slug) => LISTED.has(`${pageTypeSlug}/${slug}`),
}

export const given = bodiesIn(ROOT)

function reasonsOver(judging: Judging): (body: Body) => readonly string[] {
  return overEachText((path, text) => found(judging, path, text))
}

export const reasonsIn = reasonsOver(JUDGING)

export const scratch = scratchWorld()

export function rooted(
  files: Readonly<Record<string, string>>,
  prefix: string = "akasha-no-page-address-"
): string {
  const root = scratch.rootFor(prefix)
  founded(root)
  typed(root, "module", "page")
  typed(root, "page-type", "page")
  filing(root, "module", "held", "id-held")
  for (const [path, body] of Object.entries(files)) writing(root, path, body)
  return root
}

export function tracked(files: Readonly<Record<string, string>>): string {
  const root = rooted(files, "akasha-no-page-address-audit-")
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
