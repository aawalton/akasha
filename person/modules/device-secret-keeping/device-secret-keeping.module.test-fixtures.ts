import type { IncrementDeps } from "akasha/page/access/modules/increment-property/increment-property.module.code.ts"
import type { Fetcher } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import type {
  Incremented,
  Incrementing,
} from "akasha/page/service/modules/page-incrementing/page-incrementing.module.code.ts"
import { z } from "zod"

type Rows = Record<string, readonly Record<string, unknown>[]>

const ASKED = z.looseObject({
  pageTypeSlug: z.string(),
  where: z.record(z.string(), z.looseObject({ is: z.unknown() })).optional(),
})

const WRITTEN = z.looseObject({
  pages: z.array(
    z.looseObject({
      pageTypeSlug: z.string(),
      slug: z.string(),
      values: z.record(z.string(), z.unknown()),
      merge: z.boolean().optional(),
    })
  ),
})

export type Written = z.infer<typeof WRITTEN>

const LANDED = { commit: null, wrote: [], took: [] }

export function storeLike(
  byType: Rows,
  writes: Written[] = [],
  writing: () => Promise<Response> = async () => Response.json(LANDED)
): Fetcher {
  return async (url, init) => {
    if (url.endsWith("/write")) {
      writes.push(WRITTEN.parse(JSON.parse(String(init.body))))
      return writing()
    }
    const asked = ASKED.parse(JSON.parse(String(init.body)))
    const rows = (byType[asked.pageTypeSlug] ?? []).filter((value) => {
      for (const [key, wanted] of Object.entries(asked.where ?? {})) {
        if (value[key] !== wanted.is) return false
      }
      return true
    })
    return Response.json({ rows })
  }
}

export function counting(
  slugs: readonly string[],
  answer: Incremented,
  told: Incrementing[]
): IncrementDeps {
  return {
    find: {
      ask: async () => ({ rows: slugs.map((slug) => ({ slug })), n: slugs.length }),
      read: async () => ({ refused: "nothing is read here" }),
      write: async () => ({ refused: "nothing is written here" }),
    },
    increment: async (asked) => {
      told.push(asked)
      return answer
    },
  }
}
