import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const jsonl = {
  id: "01a0d58a-70ad-74b9-905c-3afe5f300070",
  type: "page-type/file-kind-domain",
  slug: "jsonl",
  definition: "a file holding one JSON value to a line",
  namePatterns: ["*.jsonl"],
} as const satisfies FileKindDomain
