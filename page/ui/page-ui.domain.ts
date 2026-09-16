import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageUi = {
  id: "01a05c0f-884e-7019-b4e6-08b3faac2e0b",
  type: "page-type/domain",
  slug: "page-ui",
  definition: "what draws pages in a browser and takes what a reader does to them",

  parts: [
    "domain/page-ui-app-version",
    "domain/page-ui-block-editor",
    "domain/page-ui-cache",
    "domain/page-ui-component",
    "domain/page-ui-context",
    "domain/page-ui-frame",
    "domain/page-ui-markdown",
    "domain/page-ui-media",
    "domain/page-ui-supabase",
    "module/action-verb-registry",
    "module/capability-hosts",
    "module/navigation-context",
    "module/page-card-perf",
    "module/reorder-verb-registry",
    "module/use-user-id",
    "module/view-callbacks",
  ],
} as const satisfies Domain
