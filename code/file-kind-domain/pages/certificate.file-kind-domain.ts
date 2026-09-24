import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const certificate = {
  id: "01a0d58a-70ac-779d-bb30-570e594dc941",
  type: "page-type/file-kind-domain",
  slug: "certificate",
  definition: "a file holding a certificate",
  namePatterns: ["*.crt", "*.pem", "*.cer"],
} as const satisfies FileKindDomain
