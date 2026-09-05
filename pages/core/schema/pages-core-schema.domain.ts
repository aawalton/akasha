import type { Domain } from "@akasha/domains/domain"

export const pagesCoreSchema = {
  id: "01a071cb-3d85-7fcd-8315-90eca5831d35",
  pageTypeSlug: "domain",
  slug: "pages-core-schema",
  definition: "the shape a zod validator names a config value must have",
  partSlugs: [
    "module/action-button-config",
    "module/badge-display",
    "module/coherence-rules",
    "module/color-rule",
    "module/content-tier",
    "module/cross-type-predicates",
    "module/detail-config",
    "module/listing-config",
    "module/media-config",
    "module/nav-config",
    "module/pages",
    "module/page-type-inheritance",
    "module/property-config-schemas",
    "module/quick-add",
    "module/resolve-select-options",
    "module/select-option-create",
    "module/sequence-config",
    "module/view-data",
    "module/view-data-locked",
  ],
} as const satisfies Domain
