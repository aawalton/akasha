import type { Namespace } from "../../namespaces/namespace.page-type.types.ts"

export const icloud = {
  id: "01a08cf9-6971-763f-851d-820678f5a89e",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "icloud",
  definition: "what Alan keeps with Apple, reached by a share link",
  parts: ["command/icloud-fetch"],
} as const satisfies Namespace
