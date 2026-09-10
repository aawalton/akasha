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
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page's own export is refused, since that name is the page's slug.",
    },
    {
      invariantKind: "departure",
      statement: "A type a page's file declares beside that export is renamed here.",
    },
  ],
} as const satisfies ChangeAgent
