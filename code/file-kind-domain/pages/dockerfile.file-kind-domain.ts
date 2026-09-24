import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const dockerfile = {
  id: "01a0d58a-70ad-7a5f-977e-0f2b8eacfccf",
  type: "page-type/file-kind-domain",
  slug: "dockerfile",
  definition: "a file of container recipe steps",
  namePatterns: ["Dockerfile", "Dockerfile.*", "Containerfile", "Containerfile.*"],
} as const satisfies FileKindDomain
