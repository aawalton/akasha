import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import {
  askedMatching,
  type FileWriteDeps,
  LIVE,
  refuseTooMany,
  slugsOf,
  valuesFor,
  writerLine,
} from "akasha/page/access/modules/file-write/file-write.module.code.ts"
import { FileWriteError } from "akasha/page/access/modules/file-write-error/file-write-error.module.code.ts"
import type { PagePropertiesInput } from "akasha/page/access/modules/types/types.module.code.ts"
import type { PageWhere } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { incrementingFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import type {
  Incremented,
  Incrementing,
} from "akasha/page/service/modules/page-incrementing/page-incrementing.module.code.ts"

const OP = "incrementProperty"

export type IncrementPropertyArgs<T extends Record<string, unknown> = Record<string, Json>> = {
  readonly pageTypeSlug: string
  readonly where: PageWhere
  readonly key: string
  readonly by?: number
  readonly set?: PagePropertiesInput<T>
  readonly writer?: string
}

export type IncrementDeps = {
  readonly find: FileWriteDeps
  readonly increment: (asked: Incrementing) => Promise<Incremented>
}

const INCREMENTING: IncrementDeps = {
  find: LIVE,
  increment: (asked) => incrementingFor(asked),
}

export async function incrementProperty<T extends Record<string, unknown> = Record<string, Json>>(
  args: IncrementPropertyArgs<T>,
  deps: IncrementDeps = INCREMENTING
): Promise<number | null> {
  const { rows } = await askedMatching(OP, args.pageTypeSlug, args.where, deps.find)
  const slugs = slugsOf(OP, args.pageTypeSlug, rows)
  const slug = slugs[0]
  if (slug === undefined) return null
  if (slugs.length > 1) refuseTooMany(OP, args.pageTypeSlug, slugs, "Nothing has been written.")
  const done = await deps.increment({
    writer: writerLine(args.writer),
    message: `${OP}(${args.pageTypeSlug}): ${slug}`,
    pageTypeSlug: args.pageTypeSlug,
    slug,
    key: args.key,
    by: args.by ?? 1,
    set: valuesFor(args.set ?? {}),
  })
  if ("refused" in done) {
    throw new FileWriteError(args.pageTypeSlug, `${OP}(${args.pageTypeSlug}): ${done.refused}`)
  }
  return done.value
}
