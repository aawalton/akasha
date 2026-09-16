import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageUiSupabaseMutation = {
  id: "01a071d2-6ff8-7914-854c-2f159045dd16",
  type: "page-type/domain",
  slug: "page-ui-supabase-mutation",
  definition: "a write sent through Supabase",
  parts: [
    "module/apply-prediction",
    "module/build-patch-plan",
    "module/build-predicted-row",
    "module/collection-lookup",
    "module/extract-target-ids",
    "module/use-optimistic-create-page",
    "module/use-optimistic-delete-page",
    "module/use-optimistic-delete-pages",
    "module/use-optimistic-patch-page",
    "module/use-optimistic-upsert-page",
    "module/use-optimistic-upsert-pages",
  ],
} as const satisfies Domain
