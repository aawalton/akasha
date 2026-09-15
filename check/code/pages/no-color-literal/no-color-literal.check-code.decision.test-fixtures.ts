import {
  type Passing,
  passingIn,
} from "akasha/check/code/pages/no-color-literal/no-color-literal.check-code.decision.code.ts"
import {
  founded,
  typed,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"
import { listedFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

export const HOME = "check/code/pages/no-color-literal/"

export const GRANTED_AT = "alan/atlas-web/modules/location-map/location-map.module.code.tsx"

export const CODED_AT = "alan/web/held/held.module.code.ts"

export const DRESSED_AT = "alan/web/held/held.stylesheet.styles.css"

export const PAGE_AT = "alan/web/held/held.module.ts"

export const PALETTE_AT = "design/tokens/token-values.stylesheet.styles.css"

export const COLOR_AT = "design/colors/pages/yellow.color.ts"

export const PASSING: Passing = {
  palette: "design/",
  home: HOME,
  granted: new Map([[GRANTED_AT, new Set(["#e6e4df"])]]),
}

export const scratch = scratchWorld()

const DESIGN_AT = "design/design.domain.ts"

const CHECK_AT = `${HOME}no-color-literal.check-code.ts`

const MAP_AT = "alan/atlas-web/modules/location-map/location-map.module.ts"

const DESIGN_ID = "01a08843-1c72-7a41-9f0e-1d1a5b4c7f20"

const CHECK_ID = "01a08843-1c72-7d84-8b33-2e6f0c9a4415"

const MAP_ID = "01a08843-1c72-7fb6-a0d7-3c8b1e5d9207"

function paged(
  root: string,
  kind: string,
  slug: string,
  path: string,
  id: string,
  code: string | null
): undefined {
  listedFiled(root, kind, slug, [{ path, id }])
  const said = code === null ? "" : `, code: ${JSON.stringify(code)}`
  writing(
    root,
    path,
    `export const held = { id: ${JSON.stringify(id)}, pageTypeSlug: ${JSON.stringify(kind)},` +
      ` slug: ${JSON.stringify(slug)}${said} }\n`
  )
}

export function rooted(
  files: Readonly<Record<string, string>>,
  prefix: string = "akasha-no-color-"
): string {
  const root = scratch.rootFor(prefix)
  founded(root)
  for (const kind of ["domain", "module", "check-code"]) typed(root, kind, "page")
  paged(root, "domain", "design", DESIGN_AT, DESIGN_ID, null)
  paged(root, "check-code", "no-color-literal", CHECK_AT, CHECK_ID, null)
  paged(root, "module", "location-map", MAP_AT, MAP_ID, "tsx")
  for (const [path, body] of Object.entries(files)) writing(root, path, body)
  return root
}

export function tracked(files: Readonly<Record<string, string>>): string {
  const root = rooted(files, "akasha-no-color-audit-")
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}

export function passingAt(root: string): Passing {
  return passingIn(shadowAt(root))
}
