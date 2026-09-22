import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const changePagePagePropertyText = {
  id: "01a07995-6678-72d8-97ab-a78b836b2f8d",
  type: "page-type/change-agent",
  slug: "change-page-page-property-text",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value-prose",
  definition: "the whole value a text property of a page has, stated anew in other words",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The property a key names is read from the schema the index has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A key naming a text property is handed to the mechanical change stating one key anew.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key naming a page type that extends a text property is handed on the same way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key naming any other kind of property is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That refusal names the kind of property the key names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the world names no page at is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the page's own page type has no property for is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The value under the key is stated anew whole rather than a passage of it.",
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
