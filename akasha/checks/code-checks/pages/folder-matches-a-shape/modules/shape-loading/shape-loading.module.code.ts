import { createRequire } from "node:module"
import { join } from "node:path"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { besideAt, partedIn } from "@akasha/pages-system/page-file-name"
import type { Shadow } from "@akasha/pages-system/shadow"
import type { Judging } from "../../folder-shapes/folder-shape.page-type.ts"

const SHAPE = "folder-shape"

const ENABLED = "enabled"

const CODE = "code"

const TS = "ts"

const loadFrom = createRequire(import.meta.url)

export type Shape = {
  readonly slug: string
  readonly judge: Judging
}

export function shapesIn(root: string, shadow: Shadow): readonly Shape[] {
  const found: Shape[] = []
  for (const one of shadow.index.everyOfType(SHAPE)) {
    const value = shadow.pageOf(one.path)
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
        `${one.path} is a folder shape, and no code file can stand beside a name like it`
      )
    }
    const codePath = shadow.codeAt(beside)
    if (codePath === null) {
      throw new Error(
        `${one.path} is a folder shape, and this change leaves ${beside} holding a body no path on disk holds, so it cannot be loaded to judge by`
      )
    }
    let mod: Record<string, unknown>
    try {
      mod = loadFrom(join(root, codePath)) as Record<string, unknown>
    } catch (thrown) {
      throw new Error(
        `${one.path} is a folder shape, and ${codePath} could not be loaded — ${thrown instanceof Error ? thrown.message : String(thrown)}`
      )
    }
    const named = mod[exportedAs(slug)]
    if (typeof named !== "function") {
      throw new Error(
        `${one.path} is a folder shape, and ${beside} answers to nothing that can judge`
      )
    }
    found.push({ slug, judge: named as Judging })
  }
  if (found.length === 0) {
    throw new Error(
      "no folder shape judges folders, so every folder would match nothing and a clean answer would mean nothing"
    )
  }
  return [...found].sort((one, two) => (one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0))
}
