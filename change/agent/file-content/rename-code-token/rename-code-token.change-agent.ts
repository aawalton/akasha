import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const renameCodeToken = {
  id: "01a07718-c9b6-7d80-aebd-b1155f08ab77",
  type: "page-type/change-agent",
  slug: "rename-code-token",
  changeMode: "change-mode/change-mode-rename",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-code",
  definition: "a name a code file declares renamed wherever it reaches, exported or not",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  changeKind: "change-kind/change-checked",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's own export is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type a page's file declares beside that export is renamed here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name a declaration file declares is renamed over the bodies that import it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A global is renamed where it is assigned on the global table as well.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A body naming a global without importing its declaration is reached by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A global rename leaving such a body refuses rather than spelling half of them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That refusal names every body it does not reach.",
    },
  ],
  maxCpuSeconds: 30,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
