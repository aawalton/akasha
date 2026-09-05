import type { Domain } from "@akasha/domains/domain"

export const pagesUiSupabaseMutations = {
  id: "01a071d2-6ff8-7914-854c-2f159045dd16",
  pageTypeSlug: "domain",
  slug: "pages-ui-supabase-mutations",
  definition: "a write sent through Supabase",
  partSlugs: [
    "module/apply-prediction",
    "module/build-patch-plan",
    "module/build-predicted-row",
    "module/collection-lookup",
    "module/extract-target-ids",
    "module/use-optimistic-create-page",
    "module/use-optimistic-delete-page",
    "module/use-optimistic-delete-pages",
    "module/use-optimistic-patch-page",
    "module/use-optimistic-patch-pages",
    "module/use-optimistic-patch-property-definition",
    "module/use-optimistic-upsert-page",
    "module/use-optimistic-upsert-pages",
  ],
} as const satisfies Domain
