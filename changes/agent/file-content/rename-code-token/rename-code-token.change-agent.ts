import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const renameCodeToken = {
  id: "01a07718-c9b6-7d80-aebd-b1155f08ab77",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "rename-code-token",
  changeMode: "change-mode-rename",
  definition: "a name a code file declares renamed wherever it reaches, exported or not",
  code: "ts",
  test: "ts",
  changeKind: "change-checked",
} as const satisfies ChangeAgent
