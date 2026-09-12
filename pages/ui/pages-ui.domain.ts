import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const pagesUi = {
  id: "01a05c0f-884e-7019-b4e6-08b3faac2e0b",
  type: "domain",
  slug: "pages-ui",
  definition: "what draws pages in a browser and takes what a reader does to them",

  parts: [
    "domain/components",
    "domain/pages-ui-action-verbs",
    "domain/pages-ui-app-version",
    "domain/pages-ui-block-editor",
    "domain/pages-ui-cache",
    "domain/pages-ui-capabilities",
    "domain/pages-ui-contexts",
    "domain/pages-ui-cover-click",
    "domain/pages-ui-frame",
    "domain/pages-ui-markdown",
    "domain/pages-ui-media",
    "domain/pages-ui-mutators",
    "domain/pages-ui-reorder-verbs",
    "domain/pages-ui-supabase",
    "module/navigation-context",
    "domain/pages-ui-perf",
    "domain/pages-ui-tree",
    "domain/pages-ui-units",
    "module/option-create-context",
    "module/use-user-id",
  ],
} as const satisfies Domain
