import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const addPageInstants = {
  id: "01a11c0d-14d2-7612-a0f0-e4c86de70c6a",
  type: "page-type/change-agent",
  slug: "add-page-instants",
  changeMode: "change-mode/change-mode-add-if-not-present",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "the instants a page was created and last changed, put on every page stating neither",
  takesAtMost: true,
  temporary: true,
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The run names the page type whose pages, and pages beneath, are given instants.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count handed in holds how many pages one run writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Stating the instants is left to the mechanical change acting on a page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the index.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
  createdAt: "2026-10-08T15:06:21.777Z",
  updatedAt: "2026-10-08T15:06:21.777Z",
} as const satisfies ChangeAgent
