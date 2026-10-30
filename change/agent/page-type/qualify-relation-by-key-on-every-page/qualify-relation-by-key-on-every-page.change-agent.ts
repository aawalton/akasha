import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const qualifyRelationByKeyOnEveryPage = {
  id: "01a0d3f8-a3c0-78a1-b1da-a9aa0360740c",
  type: "page-type/change-agent",
  slug: "qualify-relation-by-key-on-every-page",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition:
    "a change that replaces each name with the page that holds that name in another property",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The run names the page type the names reach and the key its pages state them under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The field is a path of keys joined by dots inside each entry beside the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count handed in holds how many pages one run writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One page refused refuses the whole change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Writing the names anew is left to the mechanical change acting on a page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the index.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
  createdAt: "2026-09-24T15:11:22.560Z",
  updatedAt: "2026-10-30T17:40:55.552Z",
} as const satisfies ChangeAgent
