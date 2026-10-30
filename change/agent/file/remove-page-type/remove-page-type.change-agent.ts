import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const removePageType = {
  id: "01a0783a-11c0-7891-a250-63a80bef1c95",
  type: "page-type/change-agent",
  slug: "remove-page-type",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page-type",
  definition: "a change that removes a page type",
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
      statement: "The refusal for a page that is no page type names the change taking a page away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type is handed to the partial change taking a page type away.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 3072,
  createdAt: "2026-09-06T19:37:46.688Z",
  updatedAt: "2026-10-30T17:10:59.916Z",
} as const satisfies ChangeAgent
