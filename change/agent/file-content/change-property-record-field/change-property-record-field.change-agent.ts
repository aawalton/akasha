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
    {
      decisionKind: "decision-kind/departure",
      statement: "A declared field a record does not state is added to that record.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A field is declared where the record property's page names that field among its properties.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A field no record property declares is refused where the record does not state that field.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The kind a declared field holds is read from the page type its property descends from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A field whose property descends from no boolean or number property is handed no kind.",
    },
  ],
  changeKind: "change-kind/change-restated",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
} as const satisfies ChangeAgent
