import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const certificate = {
  id: "01a0d58a-70ac-779d-bb30-570e594dc941",
  type: "page-type/file-kind-domain",
  slug: "certificate",
  definition: "a file holding a certificate",
  namePatterns: ["*.crt", "*.pem", "*.cer"],
  createdAt: "2026-09-24T22:30:14.956Z",
  updatedAt: "2026-09-24T22:30:20.000Z",
} as const satisfies FileKindDomain
