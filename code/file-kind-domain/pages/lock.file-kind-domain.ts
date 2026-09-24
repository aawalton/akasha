import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const lock = {
  id: "01a0d58a-70ad-7186-ada9-36c1edccc207",
  type: "page-type/file-kind-domain",
  slug: "lock",
  definition: "a file of pinned package versions",
  namePatterns: ["*.lock"],
} as const satisfies FileKindDomain
