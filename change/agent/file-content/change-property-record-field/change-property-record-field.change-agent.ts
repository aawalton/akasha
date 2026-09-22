import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const changePropertyRecordField = {
  id: "01a081db-f317-7907-8d05-07fbaed64a3d",
  type: "page-type/change-agent",
  slug: "change-property-record-field",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value-prose",
  definition: "a field of a record a page's many-valued property has, stated anew",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The record worked is named by a field of that record rather than by its place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the world names no page at is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Working the record out is left to the mechanical change of the same name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-kind/change-restated",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
} as const satisfies ChangeAgent
