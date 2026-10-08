import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const md = {
  id: "01a0d58a-70ad-705e-9bf9-688aa546ffa1",
  type: "page-type/file-kind-domain",
  slug: "md",
  definition: "a file of Markdown text",
  namePatterns: ["*.md"],
  createdAt: "2026-09-24T22:30:14.957Z",
  updatedAt: "2026-09-24T22:30:20.000Z",
} as const satisfies FileKindDomain
