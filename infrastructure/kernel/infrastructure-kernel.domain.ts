import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const infrastructureKernel = {
  id: "01a05c67-00ac-7c6f-a5c8-9391ef1427fe",
  type: "page-type/domain",
  slug: "infrastructure-kernel",
  definition: "how code reads the kernel",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "kernel" }],
  parts: ["module/inode-guard", "module/landing-admission", "module/memory-guard"],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Everything here reads a file only Linux has.",
    },
  ],
  createdAt: "2026-09-01T09:57:29.388Z",
  updatedAt: "2026-09-25T16:48:41.000Z",
} as const satisfies Domain
