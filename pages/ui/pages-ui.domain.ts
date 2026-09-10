import type { Domain } from "../../domains/domain.page-type.types.ts"

export const pagesUi = {
  id: "01a05c0f-884e-7019-b4e6-08b3faac2e0b",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "pages-ui",
  definition: "what draws pages in a browser and takes what a reader does to them",

  parts: [
    "domain/components",
    "domain/pages-ui-action-verbs",
    "domain/pages-ui-app-version",
    "domain/pages-ui-supabase",
    "domain/pages-ui-block-editor",
    "domain/pages-ui-cache",
    "domain/pages-ui-capabilities",
    "domain/pages-ui-cover-click",
    "domain/pages-ui-frame",
    "domain/pages-ui-media",
    "domain/pages-ui-markdown",
    "module/navigation-context",
    "module/option-create-context",
    "domain/pages-ui-perf",
    "domain/pages-ui-contexts",
    "domain/pages-ui-tree",
    "domain/pages-ui-units",
    "domain/pages-ui-reorder-verbs",
    "module/use-user-id",
    "domain/pages-ui-mutators",
  ],
} as const satisfies Domain
