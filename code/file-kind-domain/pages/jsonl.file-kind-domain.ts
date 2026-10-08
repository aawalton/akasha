import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const jsonl = {
  id: "01a0d58a-70ad-74b9-905c-3afe5f300070",
  type: "page-type/file-kind-domain",
  slug: "jsonl",
  definition: "a file holding one JSON value to a line",
  namePatterns: ["*.jsonl"],
  createdAt: "2026-09-24T22:30:14.957Z",
  updatedAt: "2026-09-24T22:30:20.000Z",
} as const satisfies FileKindDomain
