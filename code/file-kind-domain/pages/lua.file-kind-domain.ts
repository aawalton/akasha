import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const lua = {
  id: "01a0d58a-70ad-740b-88fa-29b8985f58ce",
  type: "page-type/file-kind-domain",
  slug: "lua",
  definition: "a file of Lua code",
  namePatterns: ["*.lua"],
  createdAt: "2026-09-24T22:30:14.957Z",
  updatedAt: "2026-10-30T15:34:15.966Z",
} as const satisfies FileKindDomain
