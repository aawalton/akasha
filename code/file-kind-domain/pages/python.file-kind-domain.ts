import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const python = {
  id: "01a0d58a-70ad-75ef-84e3-d70e93bf8aef",
  type: "page-type/file-kind-domain",
  slug: "python",
  definition: "a file of Python source",
  namePatterns: ["*.py"],
} as const satisfies FileKindDomain
