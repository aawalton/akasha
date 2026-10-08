import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const yaml = {
  id: "01a0d58a-70ae-7ed6-9214-a24b3fa32c88",
  type: "page-type/file-kind-domain",
  slug: "yaml",
  definition: "a file of YAML data",
  namePatterns: ["*.yaml"],
  createdAt: "2026-09-24T22:30:14.958Z",
  updatedAt: "2026-09-24T22:30:20.000Z",
} as const satisfies FileKindDomain
