import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const ignore = {
  id: "01a0d58a-70ad-7ad4-803e-716161e6cf9a",
  type: "page-type/file-kind-domain",
  slug: "ignore",
  definition: "a file of the path patterns a tool leaves alone",
  namePatterns: [".*ignore"],
} as const satisfies FileKindDomain
