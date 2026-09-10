import { listedFiled } from "@akasha/indexes/testing"
import { shadowAt } from "@akasha/pages/shadow"
import { ran } from "@akasha/utils/run/running"
import { bodiesAt } from "akasha/testing-system/bodying/bodying.module.code.ts"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { writing } from "../../../../commands/modules/scratching/scratching.module.test-fixtures.ts"
import { founded, typed } from "../../../modules/scratch/check-scratch.module.code.ts"
import {
  type Passing,
  passingIn,
  reasonsOver,
} from "./no-color-literal.code-check.decision.code.ts"

export const ROOT = "/repo"

export const HOME = "checks/code-checks/pages/no-color-literal/"

export const GRANTED_AT = "alan/atlas-web/location-map/location-map.module.code.tsx"

export const CODED_AT = "alan/web/held/held.module.code.ts"

export const DRESSED_AT = "alan/web/held/held.stylesheet.styles.css"

export const PAGE_AT = "alan/web/held/held.module.ts"

export const PALETTE_AT = "design/tokens/token-values.stylesheet.styles.css"

export const PASSING: Passing = {
  palette: "design/",
  home: HOME,
  granted: new Map([[GRANTED_AT, new Set(["#e6e4df"])]]),
}

export const reasonsIn = reasonsOver(PASSING)

export const coded = bodiesAt(ROOT, CODED_AT)

export const dressed = bodiesAt(ROOT, DRESSED_AT)

export const scratch = scratchWorld()

const DESIGN_AT = "design/design.domain.ts"

const CHECK_AT = `${HOME}no-color-literal.code-check.ts`

const MAP_AT = "alan/atlas-web/location-map/location-map.module.ts"

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
  for (const kind of ["domain", "module", "code-check"]) typed(root, kind, "page")
  paged(root, "domain", "design", DESIGN_AT, DESIGN_ID, null)
  paged(root, "code-check", "no-color-literal", CHECK_AT, CHECK_ID, null)
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
