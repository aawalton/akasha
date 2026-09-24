import { basename } from "node:path"
import type {
  Judging,
  Standing,
} from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import type { Paged } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import {
  bodyFor,
  type Held,
  heldOver,
} from "akasha/code/body/modules/body-loading/body-loading.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { besideAt, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const SHAPE = "folder-shape"

const ENABLED = "enabled"

const CODE = "code"

const TS = "ts"

const HOLDS = "HOLDS"

export type Shape = {
  readonly slug: string
  readonly judge: Judging
  readonly holds: readonly string[] | null
}

function namesIn(takes: unknown): readonly string[] | null {
  if (!Array.isArray(takes)) return null
  const found = takes.filter((one): one is string => typeof one === "string")
  return found.length === takes.length && found.length > 0 ? found : null
}

function saidAs(names: readonly string[]): string {
  return names.map((one) => `\`${one}\``).join(" or ")
}

export function namesHeldBy(shapes: readonly Shape[]): ReadonlySet<string> {
  const found = new Set<string>()
  for (const one of shapes) {
    for (const name of one.holds ?? []) found.add(name)
  }
  return found
}

export function judgedBy(shape: Shape, standing: Standing): readonly string[] {
  if (shape.holds === null) return shape.judge(standing)
  const named = basename(standing.folder)
  if (shape.holds.includes(named)) return shape.judge(standing)
  return [`it is named \`${named}\` rather than ${saidAs(shape.holds)}`]
}

export type Loading = {
  readonly index: Pick<Paged["index"], "everyOfType">
  readonly pageOf: Paged["pageOf"]
}

export function shapesIn(change: Change, loading: Loading): readonly Shape[] {
  const found: Shape[] = []
  for (const one of loading.index.everyOfType(SHAPE)) {
    const value = loading.pageOf(one.path)
    if (value === null) {
      throw new Error(
        `${one.path} is a folder shape, and its page reads as nothing, so whether it judges folders cannot be read`
      )
    }
    const enabled = value[ENABLED]
    if (typeof enabled !== "boolean") {
      throw new Error(`${one.path} is a folder shape, and its page says no \`${ENABLED}\``)
    }
    if (!enabled) continue
    const said = partedIn(one.path)
    if (said === null || said.sections.length > 0) {
      throw new Error(`${one.path} is a folder shape, and its name says no slug`)
    }
    const slug = said.slug
    const beside = besideAt(one.path, CODE, TS)
    if (beside === null) {
      throw new Error(
        `${one.path} is a folder shape, and no code file can sit beside a name like it`
      )
    }
    let mod: Held
    try {
      mod = heldOver(change, beside, bodyFor(change, beside))
    } catch (thrown) {
      throw new Error(
        `${one.path} is a folder shape, and ${beside} could not be loaded — ${thrown instanceof Error ? thrown.message : String(thrown)}`
      )
    }
    const named = mod[exportedAs(slug)]
    if (typeof named !== "function") {
      throw new Error(
        `${one.path} is a folder shape, and ${beside} answers to nothing that can judge`
      )
    }
    found.push({ slug, judge: named as Judging, holds: namesIn(mod[HOLDS]) })
  }
  if (found.length === 0) {
    throw new Error(
      "no folder shape judges folders, so every folder would match nothing and a clean answer would mean nothing"
    )
  }
  return [...found].sort((one, two) => (one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0))
}
