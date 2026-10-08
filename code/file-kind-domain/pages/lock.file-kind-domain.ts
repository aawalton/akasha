import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const lock = {
  id: "01a0d58a-70ad-7186-ada9-36c1edccc207",
  type: "page-type/file-kind-domain",
  slug: "lock",
  definition: "a file of pinned package versions",
  namePatterns: ["*.lock"],
  createdAt: "2026-09-24T22:30:14.957Z",
  updatedAt: "2026-09-24T22:30:20.000Z",
} as const satisfies FileKindDomain
