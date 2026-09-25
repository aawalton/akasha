import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const grammar = {
  id: "01a0d9aa-7c59-7d35-8766-d4f6bc6ef64a",
  type: "page-type/namespace",
  slug: "grammar",
  definition: "which phrases the Standard Agent English grammar admits, and the words it reads",
  parts: ["command/grammar-refused", "command/grammar-try", "command/grammar-words"],
  name: "grammar",
} as const satisfies Namespace
