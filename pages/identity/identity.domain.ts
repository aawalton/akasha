import type { Domain } from "../../domains/domain.page-type.types.ts"

export const identity = {
  id: "01a05c69-e870-7637-b745-5f768a4c4a67",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "identity",
  definition: "what a page kept in a file is known by",
  parts: ["module/file-page", "module/sha1-digest"],
} as const satisfies Domain
