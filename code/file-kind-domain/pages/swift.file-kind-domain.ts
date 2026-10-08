import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const swift = {
  id: "01a0d58a-70ad-7322-8f2b-d0ad55583b0e",
  type: "page-type/file-kind-domain",
  slug: "swift",
  definition: "a file of Swift source",
  namePatterns: ["*.swift"],
  createdAt: "2026-09-24T22:30:14.957Z",
  updatedAt: "2026-09-24T22:30:20.000Z",
} as const satisfies FileKindDomain
