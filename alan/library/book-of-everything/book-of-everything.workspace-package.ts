import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const bookOfEverything = {
  id: "01a06584-9bf3-7008-b597-8cc5e6e6c3e6",
  pageTypeSlug: "workspace-package",
  slug: "book-of-everything",
  definition: "how far into the whole of knowledge Ali has read, node by node",
  manifest: "json",
  partSlugs: [
    "page-type/learn-everything-topic",
    "module/propaedia-outline",
    "module/books-root",
    "module/node-profile",
    "module/coverage-fold",
    "module/coverage-status",
    "module/status-tree",
    "module/topic-tree",
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
      invariantKind: "departure",
      statement: "A topic names the topic above rather than sitting in that topic's folder.",
    },
    {
      invariantKind: "departure",
      statement: "How far Alan has mastered each part of the map is kept with the part.",
    },
  ],
} as const satisfies WorkspacePackage
