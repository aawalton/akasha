import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const pagesCore = {
  id: "01a05b92-a9c7-7180-bdd4-8e13e47841e5",
  pageTypeSlug: "workspace-package",
  slug: "pages-core",
  definition: "what a page's values mean before any store or screen",
  manifest: "json",
  partSlugs: [
    "domain/pages-core-property-types",
    "domain/pages-core-schema",
    "domain/pages-core-json-patch",
    "domain/pages-core-view",
    "module/as-json",
    "module/color-rules",
    "domain/pages-core-generated",
    "domain/pages-core-filter",
    "module/icon",
    "module/media-formats",
    "module/null-ordering",
    "module/page-data",
    "module/page-types",
    "domain/pages-core-view-state",
    "module/task-lifecycle",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A property type answers for its own values rather than the store answering for all of them.",
    },
    {
      invariantKind: "departure",
      statement:
        "A view is worked out from the rows handed to the view rather than asked of a server.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a network or a disk.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing here is proved by a test of its own.",
    },
    {
      invariantKind: "gap",
      statement: "The icon index is written by a command no page here names.",
    },
  ],
} as const satisfies WorkspacePackage
