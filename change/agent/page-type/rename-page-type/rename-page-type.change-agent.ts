import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const renamePageType = {
  id: "01a0828f-8c20-74d5-b11c-d220948452b4",
  type: "page-type/change-agent",
  slug: "rename-page-type",
  changeMode: "change-mode/change-mode-rename",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page",
  definition: "a page type renamed, by the partial change renaming a page type",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The kind of page is read from the path rather than from the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the naming grammar reads as no page file is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page that is no page type is refused here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal for a page that is no page type names the change renaming a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type is handed to the partial change renaming a page type.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
