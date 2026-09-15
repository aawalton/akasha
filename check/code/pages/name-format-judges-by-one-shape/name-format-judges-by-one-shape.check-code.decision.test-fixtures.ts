import {
  type Handed,
  handedIn,
  reasonsIn,
  refusalsOver,
} from "akasha/check/code/pages/name-format-judges-by-one-shape/name-format-judges-by-one-shape.check-code.decision.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { change } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"
import {
  idFiled,
  listedFiled,
  valueAlsoFiled,
} from "akasha/page/index/modules/filing/index-filing.module.code.ts"
import { shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"

export const AT = "akasha/f/lower-kebab-case.name-format.code.ts"

export const IMPORTING =
  'import { matching } from "../name-matching/name-matching.module.code.ts"\n'

export const IMPORTING_AS =
  'import { matching as judging } from "../name-matching/name-matching.module.code.ts"\n'

const MATCHING_AT = "akasha/name-matching/name-matching.module.code.ts"

export const SLUG = "lower-kebab-case"

const PAGE_AT = "akasha/f/lower-kebab-case.name-format.ts"

const MATCHING_CODE = "export function matching(shape) {\n  return (name) => shape.test(name)\n}\n"

const MATCHING_PAGE = "akasha/name-matching/name-matching.module.ts"

const MATCHING_ID = "01a0824b-5ca2-752a-9266-90b200862bb4"

const ID = "01a05946-775f-7000-9f76-45d9dcf376ee"

export const scratch = scratchWorld()

export function handing(path: string, text: string): readonly Handed[] {
  return handedIn(path, text, MATCHING_AT)
}

export function reasoning(slug: string, path: string, text: string): readonly string[] {
  return reasonsIn(slug, path, text, MATCHING_AT)
}

export function rooted(body: string, prefix: string = "akasha-name-format-shape-"): string {
  const root = scratch.rootFor(prefix)
  writing(root, MATCHING_AT, MATCHING_CODE)
  writing(
    root,
    MATCHING_PAGE,
    `export const nameMatching = { id: "${MATCHING_ID}", slug: "name-matching",` +
      ' pageTypeSlug: "module", code: "ts" }\n'
  )
  writing(
    root,
    PAGE_AT,
    `export const lowerKebabCase = { id: "${ID}", slug: "lower-kebab-case",` +
      ' pageTypeSlug: "name-format", code: "ts" }\n'
  )
  writing(root, AT, body)
  const matching = [{ path: MATCHING_PAGE, id: MATCHING_ID }]
  idFiled(root, MATCHING_ID, matching)
  listedFiled(root, "module", "name-matching", matching)
  const held = [{ path: PAGE_AT, id: ID }]
  idFiled(root, ID, held)
  listedFiled(root, "name-format", SLUG, held)
  valueAlsoFiled(root, "name-format", [
    { path: PAGE_AT, value: { id: ID, pageTypeSlug: "name-format", slug: SLUG } },
  ])
  return root
}

export function tracked(body: string): string {
  const root = rooted(body, "akasha-name-format-audit-")
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}

export const WILL_NOT_LOAD = `${IMPORTING}\nexport const lowerKebabCase = matching(/^[a-z-]+$/\n`

export function judgedBy(root: string, named: readonly string[] = []): readonly Judged[] {
  const held = change(root, named)
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)
  return refusalsOver(held, cast.shadow)
}
