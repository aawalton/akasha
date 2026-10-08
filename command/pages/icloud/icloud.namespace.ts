import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const icloud = {
  id: "01a08cf9-6971-763f-851d-820678f5a89e",
  type: "page-type/namespace",
  slug: "icloud",
  definition: "what Alan keeps with Apple, reached by a share link",
  parts: ["command/icloud-fetch"],
  name: "icloud",
  createdAt: "2026-09-10T20:19:10.833Z",
  updatedAt: "2026-09-15T15:51:21.000Z",
} as const satisfies Namespace
