import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildStampGate = {
  id: "01a05cee-e560-7095-8d3c-c3c7cef4babf",
  type: "page-type/module",
  slug: "build-stamp-gate",
  definition:
    "the shell script that fails a mobile cut where a program carries no commit or another commit",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit is read back out of the compiled binary with strings.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A binary with no stamp is refused the same as a binary with a wrong commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every widget extension under PlugIns is checked beside the app binary.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every binary is checked before the gate refuses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A passing gate says so by printing one fixed marker line.",
    },
  ],
  createdAt: "2026-09-01T12:25:55.296Z",
  updatedAt: "2026-10-30T16:24:43.427Z",
} as const satisfies Module
