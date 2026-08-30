import { createRequire } from "node:module"
import { join } from "node:path"
import { standingAt } from "../../indexes/index-reading/index-reading.module.code.ts"
import { slugIn } from "../../page/page-address/page-address.module.code.ts"
import { exportedAs } from "../../page/page-export-name/page-export-name.module.code.ts"
import { besideAt } from "../../page/page-file-name/page-file-name.module.code.ts"
import type { Matching } from "../name-matching/name-matching.module.code.ts"

const NAME_FORMAT = "name-format"

const CODE = "code"

const TS = "ts"

const loadFrom = createRequire(import.meta.url)

export type Formatting = (nameFormatSlug: string) => Matching

export function matchingIn(root: string): Formatting {
  const held = new Map<string, Matching>()
  return (nameFormatSlug) => {
    const found = held.get(nameFormatSlug)
    if (found !== undefined) return found
    const slug = slugIn(nameFormatSlug)
    if (slug === null) {
      throw new Error(
        `\`${nameFormatSlug}\` names a name format by id, and a format is reached here by slug`
      )
    }
    const one = standingAt(root, NAME_FORMAT, slug)[0]
    if (one === undefined) {
      throw new Error(
        `no name format carries the slug \`${slug}\`, so nothing can judge a value said to be written in it`
      )
    }
    const beside = besideAt(one.path, CODE, TS)
    if (beside === null) {
      throw new Error(
        `${one.path} is a name format, and no code file can stand beside a name like it`
      )
    }
    let mod: Record<string, unknown>
    try {
      mod = loadFrom(join(root, beside)) as Record<string, unknown>
    } catch (thrown) {
      throw new Error(
        `${one.path} is a name format, and ${beside} could not be loaded — ${thrown instanceof Error ? thrown.message : String(thrown)}`
      )
    }
    const named = mod[exportedAs(slug)]
    if (typeof named !== "function") {
      throw new Error(
        `${one.path} is a name format, and ${beside} answers to nothing that can judge`
      )
    }
    const matching = named as Matching
    held.set(nameFormatSlug, matching)
    return matching
  }
}
