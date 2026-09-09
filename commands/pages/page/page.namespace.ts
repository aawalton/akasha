import type { Namespace } from "../../namespaces/namespace.page-type.ts"

export const page = {
  id: "01a07bc6-efea-7015-b052-b4eab209b1ae",
  pageTypeSlug: "namespace",
  slug: "page",
  definition: "the pages themselves, reached as pages rather than as what they are about",
  parts: ["command/page-icon-search-index-generate", "namespace/page-secret", "command/page-tree"],
} as const satisfies Namespace
