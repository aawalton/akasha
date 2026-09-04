import { z } from "zod"
import type { ViewDataJSON } from "../view-data/view-data.module.code.ts"
import {
  galleryCardSizeSchema,
  viewFilterSchema,
  viewLayoutSchema,
  viewSortSchema,
} from "../view-data/view-data.module.code.ts"

export const listingConfigSchema = z
  .object({
    layout: viewLayoutSchema.optional(),
    gallery_cover_source: z.string().optional(),
    gallery_card_size: galleryCardSizeSchema.optional(),
    notes_property: z.string().optional(),
    sorts: z.array(viewSortSchema).optional(),
    visible_properties: z.array(z.string()).optional(),
    always_show_properties: z.array(z.string()).optional(),
    filters: z.array(viewFilterSchema).optional(),
    includeDescendants: z.boolean().optional(),
    coverAction: z.object({ capability: z.string() }).optional(),
  })
  .passthrough()

export type ListingConfig = z.infer<typeof listingConfigSchema>

export function parseListingConfig(value: unknown): ListingConfig | undefined {
  if (value == null) return undefined
  const parsed = listingConfigSchema.safeParse(value)
  return parsed.success ? parsed.data : undefined
}

export function listingIncludesDescendants(cfg: ListingConfig | undefined): boolean {
  return cfg?.includeDescendants !== false
}

type ViewDataProjection = Omit<ViewDataJSON, "sorts" | "filters"> & {
  sorts?: ListingConfig["sorts"]
  filters?: ListingConfig["filters"]
}

function asViewDataJSON(value: ViewDataProjection): ViewDataJSON {
  return value as ViewDataJSON
}

export function listingConfigToViewData(cfg: ListingConfig): ViewDataJSON {
  return asViewDataJSON({
    version: 1,
    layout: cfg.layout,
    gallery_cover_source: cfg.gallery_cover_source,
    gallery_card_size: cfg.gallery_card_size,
    notes_property: cfg.notes_property,
    sorts: cfg.sorts,
    visible_properties: cfg.visible_properties,
    always_show_properties: cfg.always_show_properties,
    filters: cfg.filters,
  })
}
