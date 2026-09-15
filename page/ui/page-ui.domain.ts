import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageUi = {
  id: "01a05c0f-884e-7019-b4e6-08b3faac2e0b",
  type: "domain",
  slug: "page-ui",
  definition: "what draws pages in a browser and takes what a reader does to them",

  parts: [
    "domain/components",
    "domain/page-ui-action-verb",
    "domain/page-ui-app-version",
    "domain/page-ui-block-editor",
    "domain/page-ui-cache",
    "domain/page-ui-capability",
    "domain/page-ui-contexts",
    "domain/page-ui-frame",
    "domain/page-ui-markdown",
    "domain/page-ui-media",
    "domain/page-ui-mutators",
    "domain/page-ui-perf",
    "domain/page-ui-reorder-verbs",
    "domain/page-ui-supabase",
    "module/navigation-context",
    "module/option-create-context",
    "module/use-user-id",
  ],
} as const satisfies Domain
