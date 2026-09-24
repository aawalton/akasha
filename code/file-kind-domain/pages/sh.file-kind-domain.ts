import type { FileKindDomain } from "akasha/code/file-kind-domain/file-kind-domain.page-type.types.ts"

export const sh = {
  id: "01a0d58a-70ad-7cc6-b369-54e78a963e81",
  type: "page-type/file-kind-domain",
  slug: "sh",
  definition: "a file of shell script",
  namePatterns: ["*.sh", "*.bash"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Bash is a kind of sh.",
    },
  ],
} as const satisfies FileKindDomain
