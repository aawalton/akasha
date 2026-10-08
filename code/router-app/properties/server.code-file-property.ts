import type { CodeFileProperty } from "akasha/page/code-file-property/code-file-property.page-type.types.ts"

export const server = {
  id: "01a0817a-8b91-73c6-a0bd-8c66940f995b",
  type: "page-type/code-file-property",
  slug: "server",
  propertySlug: "server",
  definition: "what listens on a port and hands each request to the router",
  extensions: ["ts"],
  fileName: "server.ts",
  types: "ts",
  createdAt: "2026-09-08T14:44:47.121Z",
  updatedAt: "2026-09-15T16:19:31.000Z",
} as const satisfies CodeFileProperty
