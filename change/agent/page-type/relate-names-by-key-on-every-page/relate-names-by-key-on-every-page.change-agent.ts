import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const relateNamesByKeyOnEveryPage = {
  id: "01a18433-10c1-794e-babe-c324a5de1d15",
  type: "page-type/change-agent",
  slug: "relate-names-by-key-on-every-page",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition:
    "a change that replaces each name in a property with the page that holds that name in a list",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The run names the page type the names reach and the key its pages list them under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Names that reach one page are written as that page once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count handed in holds how many pages one run writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One name reaching no page refuses the whole change.",
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
  createdAt: "2026-10-28T20:28:21.567Z",
  updatedAt: "2026-10-30T17:41:08.706Z",
} as const satisfies ChangeAgent
