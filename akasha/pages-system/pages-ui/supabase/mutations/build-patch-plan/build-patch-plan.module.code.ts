import { PROMOTED_COLUMN_KEYS } from "@akasha/pages-access/routing-core"
import type { JsonPatch } from "@akasha/pages-access/types"
import { asJson } from "@akasha/pages-core/as-json"
import type { RowOverlay } from "@akasha/pages-ui-store/optimistic/plan"
import type { Json } from "@akasha/utils-narrow/json-value"
import { z } from "zod"

const PromotedColumnPatchSchema = z
  .object({
    title: z.string().nullable().optional(),
    icon: z.string().nullable().optional(),
    slug: z.string().nullable().optional(),
    page_type_id: z.string().optional(),
    seq: z.number().int().optional(),
    page_type_slug: z.string().optional(),
  })
  .strict()

export type PromotedColumnPatch = z.infer<typeof PromotedColumnPatchSchema>

const CAMEL_TO_SNAKE: Record<string, string> = {
  id: "id",
  seq: "seq",
  title: "title",
  icon: "icon",
  slug: "slug",
  pageTypeId: "page_type_id",
  pageTypeSlug: "page_type_slug",
  uniqueKey: "unique_key",
}

export function buildPatchPlan(args: {
  readonly set: Record<string, unknown>
  readonly patch?: JsonPatch | undefined
}): {
  readonly patchPromoted: PromotedColumnPatch
  readonly patchAttributes: Record<string, unknown>
  readonly patchAttributesPatch: JsonPatch | undefined
} {
  const promotedRaw: Record<string, unknown> = {}
  const patchAttributes: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(args.set)) {
    if (PROMOTED_COLUMN_KEYS.has(k)) {
      const snake = CAMEL_TO_SNAKE[k] ?? k
      if (snake !== "id" && snake !== "unique_key") promotedRaw[snake] = v
    } else {
      patchAttributes[k] = v
    }
  }
  const patchPromoted = PromotedColumnPatchSchema.parse(promotedRaw)
  return {
    patchPromoted,
    patchAttributes,
    patchAttributesPatch: args.patch,
  }
}

export function buildOverlay(triple: {
  readonly patchPromoted: PromotedColumnPatch
  readonly patchAttributes: Record<string, unknown>
  readonly patchAttributesPatch: JsonPatch | undefined
}): RowOverlay {
  const attributes: Record<string, Json> = {}
  for (const [k, v] of Object.entries(triple.patchAttributes)) attributes[k] = asJson(v)
  return {
    attributes,
    attributesPatch: triple.patchAttributesPatch,
    promoted: triple.patchPromoted,
  }
}
