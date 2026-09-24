import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const conf = {
  id: "01a0d58a-70ad-7118-8adf-69b321743b5f",
  type: "page-type/file-kind-domain",
  slug: "conf",
  definition: "a file of settings a program reads",
  namePatterns: ["*.conf"],
} as const satisfies FileKindDomain
