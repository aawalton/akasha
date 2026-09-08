import type { NamedFileProperty } from "@akasha/pages/named-file-property"

export type Server = "ts"

export const server = {
  id: "01a0817a-8b91-73c6-a0bd-8c66940f995b",
  pageTypeSlug: "named-file-property",
  slug: "server",
  propertySlug: "server",
  definition: "what listens on a port and hands each request to the router",
  fileName: "server.ts",
} as const satisfies NamedFileProperty
