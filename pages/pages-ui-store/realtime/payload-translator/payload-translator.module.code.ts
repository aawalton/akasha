import type { RawPageRow } from "@akasha/pages-access/page-row"
import { z } from "zod"

const isoTimestamp = z.union([z.string(), z.date()]).transform((v, ctx) => {
  const date = v instanceof Date ? v : new Date(v)
  if (Number.isNaN(date.getTime())) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: `invalid timestamp: ${String(v)}` })
    return z.NEVER
  }
  return date.toISOString()
})

export const PageRowSchema = z.object({
  id: z.string().uuid(),
  page_type_id: z.string().uuid(),
  seq: z
    .number()
    .int()
    .or(z.string())
    .transform((v, ctx) => {
      const n = typeof v === "number" ? v : Number(v)
      if (!Number.isFinite(n)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: `invalid seq: ${String(v)}` })
        return z.NEVER
      }
      return n
    }),
  title: z.string().nullable(),
  icon: z.string().nullable(),
  slug: z.string().nullable(),
  attributes: z.unknown(),
  page_type_slug: z.string(),
  unique_key: z.string().nullable(),
  status: z.string().nullable(),
  completed_at: isoTimestamp.nullable(),
  favorited_at: isoTimestamp.nullable(),
  last_viewed_at: isoTimestamp.nullable(),
})

export type PageRow = RawPageRow
