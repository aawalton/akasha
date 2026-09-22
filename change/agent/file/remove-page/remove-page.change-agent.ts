import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const removePage = {
  id: "01a0776d-8d1e-7f93-a0e2-4c566d49f8fd",
  type: "page-type/change-agent",
  slug: "remove-page",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page",
  definition: "a page taken away, by the partial change fitting the kind of page named",
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
      statement: "A page type is refused here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal for a page type names the change that takes a page type away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page that is no page type is handed to the partial change taking that kind of page away.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page property is handed to the partial change taking a page property away.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
