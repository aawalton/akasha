import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const xml = {
  id: "01a0d58a-70ae-7a6a-8be7-8c0d00e17fdf",
  type: "page-type/file-kind-domain",
  slug: "xml",
  definition: "a file of XML markup",
  namePatterns: ["*.xml", "*.svg", "*.kml", "*.plist", "*.entitlements"],
} as const satisfies FileKindDomain
