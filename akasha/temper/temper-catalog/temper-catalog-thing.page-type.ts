import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperThing } from "../temper-thing.page-type.ts"
import type { Effect } from "./properties/effect.text-property.ts"
import type { Effects } from "./properties/effects.page-property-entry.ts"
import type { EsoTraitConstantName } from "./properties/eso-trait-constant-name.text-property.ts"
import type { Material } from "./properties/material.text-property.ts"
import type { QualityValues } from "./properties/quality-values.page-property-entry.ts"

export type TemperCatalogThing = TemperThing & {
  effect?: Effect
  material?: Material
  esoTraitConstantName?: EsoTraitConstantName
  effects?: Effects
  qualityValues?: QualityValues
}

export const temperCatalogThing = {
  id: "01a05fb0-3cea-7e62-9477-d1a11db7b2e5",
  pageTypeSlug: "page-type",
  slug: "temper-catalog-thing",
  definition: "anything the game itself holds that temper mirrors a page for",
  pluralSlug: "temper-catalog-things",
  extendsSlug: "page-type/temper-thing",
  partSlugs: [
    "number-property/effect-seconds",
    "number-property/effect-value",
    "number-property/quality-value",
    "page-property-entry/effects",
    "page-property-entry/quality-values",
    "text-property/effect",
    "text-property/effect-type",
    "text-property/eso-trait-constant-name",
    "text-property/material",
    "text-property/metric-id",
    "text-property/quality",
  ],
  properties: [
    { pagePropertySlug: "effect", required: false, many: false },
    { pagePropertySlug: "material", required: false, many: false },
    { pagePropertySlug: "eso-trait-constant-name", required: false, many: false },
    { pagePropertySlug: "effects", required: false, many: false },
    { pagePropertySlug: "quality-values", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "What a thing does is stated in one shape whatever kind of thing carries the effect.",
    },
  ],
} as const satisfies PageType
