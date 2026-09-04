import { createRequire } from "node:module"
import { join } from "node:path"
import type { Answering } from "@akasha/indexes/answering"
import { slugIn } from "../../../address/page-address.module.code.ts"
import { exportedAs } from "../../../export-name/page-export-name.module.code.ts"
import { besideAt } from "../../../file-name/page-file-name.module.code.ts"
import type { Matching } from "../name-matching/name-matching.module.code.ts"

const NAME_FORMAT = "name-format"

const CODE = "code"

const TS = "ts"

const loadFrom = createRequire(import.meta.url)

export type Formatting = (nameFormatSlug: string) => Matching

export function matchingIn(
  root: string,
  index: Answering,
  codeAt: (path: string) => string | null = (path) => path
): Formatting {
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
    const one = index.listedAt(NAME_FORMAT, slug)[0]
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
    const codePath = codeAt(beside)
    if (codePath === null) {
      throw new Error(
        `${one.path} is a name format, and this change leaves ${beside} holding a body no path on disk holds, so it cannot be loaded to judge by`
      )
    }
    let mod: Record<string, unknown>
    try {
      mod = loadFrom(join(root, codePath)) as Record<string, unknown>
    } catch (thrown) {
      throw new Error(
        `${one.path} is a name format, and ${codePath} could not be loaded — ${thrown instanceof Error ? thrown.message : String(thrown)}`
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
