import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const txt = {
  id: "01a0d58a-70ad-7f05-896b-0331e553ad74",
  type: "page-type/file-kind-domain",
  slug: "txt",
  definition: "a file of plain text",
  namePatterns: ["*.txt", "LICENSE", "LICENCE", "COPYING", "NOTICE"],
  createdAt: "2026-09-24T22:30:14.957Z",
  updatedAt: "2026-09-24T22:30:20.000Z",
} as const satisfies FileKindDomain
