import type { IncrementDeps } from "akasha/page/access/modules/increment-property/increment-property.module.code.ts"
import type { Fetcher } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import type {
  Incremented,
  Incrementing,
} from "akasha/page/service/modules/page-incrementing/page-incrementing.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"
import {
  DEVICE_SECRET_PAGE_TYPE,
  deviceSecretSlug,
  hashDeviceSecret,
} from "akasha/person/modules/device-secret-keeping/device-secret-keeping.module.code.ts"
import { alan } from "akasha/person/pages/alan/alan.person.ts"
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
      fresh: z.boolean().optional(),
    })
  ),
  read: z.string().optional(),
})

const READ = z.object({
  pages: z.array(z.object({ pageTypeSlug: z.string(), slug: z.string() })),
})

export const ALAN_ACCOUNT = alan.id

export const A_DEVICE = "A1B2C3D4-E5F6-47B8-9C0D-1E2F3A4B5C6D"

export const AN_ID = "01a05b39-f50c-7841-a154-33ae8bc93e0a"

export function pageFor(secret: string, over: Partial<Record<string, string>> = {}) {
  return {
    id: AN_ID,
    type: `${pageType.slug}/${DEVICE_SECRET_PAGE_TYPE}`,
    slug: deviceSecretSlug("alan", A_DEVICE),
    userId: ALAN_ACCOUNT,
    deviceId: A_DEVICE,
    secretHash: hashDeviceSecret(secret),
    ...over,
  }
}

export const ASKED_AT = "commit-asked"

export const READ_AT = "commit-read"

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
    if (url.endsWith("/read")) {
      const { pages } = READ.parse(JSON.parse(String(init.body)))
      const bodies = pages.map((one) => ({
        path: `${one.slug}.${one.pageTypeSlug}.ts`,
        content: (byType[one.pageTypeSlug] ?? []).some((row) => row.slug === one.slug)
          ? "held"
          : null,
      }))
      return Response.json({ at: READ_AT, bodies, unplaced: [] })
    }
    const asked = ASKED.parse(JSON.parse(String(init.body)))
    const rows = (byType[asked.pageTypeSlug] ?? []).filter((value) => {
      for (const [key, wanted] of Object.entries(asked.where ?? {})) {
        if (value[key] !== wanted.is) return false
      }
      return true
    })
    return Response.json({ rows, at: ASKED_AT })
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
