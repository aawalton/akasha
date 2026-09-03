import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const bookOfEverything = {
  id: "01a06584-9bf3-7008-b597-8cc5e6e6c3e6",
  pageTypeSlug: "workspace-package",
  slug: "book-of-everything",
  definition: "how far into the whole of knowledge Ali has read, node by node",
  manifest: "json",
  partSlugs: [
    "module/propaedia-outline",
    "module/books-root",
    "module/node-profile",
    "module/coverage-fold",
    "module/coverage-status",
    "module/status-tree",
    "module/random-leaf-select",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The outline is the whole of what there is to know.",
    },
    {
      invariantKind: "departure",
      statement: "What is on disk is how far into the outline Ali has got.",
    },
    {
      invariantKind: "departure",
      statement: "A node's depth is judged by hand.",
    },
    {
      invariantKind: "departure",
      statement: "A node's coverage is worked out from the children beneath the node.",
    },
    {
      invariantKind: "stopgap",
      statement: "The books are a tree of markdown folders rather than pages.",
    },
  ],
} as const satisfies WorkspacePackage
