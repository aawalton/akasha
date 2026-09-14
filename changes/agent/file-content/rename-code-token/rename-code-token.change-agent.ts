import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const renameCodeToken = {
  id: "01a07718-c9b6-7d80-aebd-b1155f08ab77",
  type: "change-agent",
  slug: "rename-code-token",
  changeMode: "change-mode/change-mode-rename",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-code",
  definition: "a name a code file declares renamed wherever it reaches, exported or not",
  code: "ts",
  test: "ts",
  changeKind: "change-kind/change-checked",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page's own export is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A type a page's file declares beside that export is renamed here.",
    },
  ],
  maxCpuSeconds: 30,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
