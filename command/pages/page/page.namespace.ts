import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const page = {
  id: "01a07bc6-efea-7015-b052-b4eab209b1ae",
  type: "page-type/namespace",
  slug: "page",
  definition: "the pages themselves, reached as pages rather than as what they are about",
  parts: ["command/page-icon-search-index-generate", "namespace/page-secret"],
  name: "page",
  createdAt: "2026-09-07T12:10:30.250Z",
  updatedAt: "2026-09-25T12:48:15.000Z",
} as const satisfies Namespace
