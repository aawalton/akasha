import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const rewriteAccountPageValues = {
  id: "01a0d425-7b40-764e-9b26-d0087252cc22",
  type: "page-type/change-agent",
  slug: "rewrite-account-page-values",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition:
    "one value a key holds written as another, on every page of a page type and beside it",
  temporary: true,
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The value is written anew in the page's body and in every entry file beside the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry file is read only where its shape declares the key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value other than the one handed in is left as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type no page of which holds the value is refused.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 600,
  maxMemoryMb: 6144,
} as const satisfies ChangeAgent
