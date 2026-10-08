import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const html = {
  id: "01a0d58a-70ad-78af-9098-536e57dc83a8",
  type: "page-type/file-kind-domain",
  slug: "html",
  definition: "a file of HTML markup",
  namePatterns: ["*.html", "*.htm"],
  createdAt: "2026-09-24T22:30:14.957Z",
  updatedAt: "2026-09-24T22:30:20.000Z",
} as const satisfies FileKindDomain
