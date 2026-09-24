import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const lua = {
  id: "01a0d58a-70ad-740b-88fa-29b8985f58ce",
  type: "page-type/file-kind-domain",
  slug: "lua",
  definition: "a file of Lua source",
  namePatterns: ["*.lua"],
} as const satisfies FileKindDomain
