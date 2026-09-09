import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const renamePageType = {
  id: "01a0828f-8c20-74d5-b11c-d220948452b4",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "rename-page-type",
  changeMode: "change-mode-rename",
  definition: "one page type renamed, by the partial change renaming a page type",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The kind of page is read from the path rather than from the index.",
    },
    {
      invariantKind: "departure",
      statement: "A path the naming grammar reads as no page file is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page that is no page type is refused here.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal for a page that is no page type names the change renaming a page.",
    },
    {
      invariantKind: "departure",
      statement: "A page type is handed to the partial change renaming a page type.",
    },
    {
      invariantKind: "departure",
      statement: "`plural` is handed on where the caller states `plural`.",
    },
    {
      invariantKind: "departure",
      statement: "`plural` is left out where the caller states no `plural`.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
