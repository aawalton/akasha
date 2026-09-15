import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const changePagePagePropertyText = {
  id: "01a07995-6678-72d8-97ab-a78b836b2f8d",
  type: "change-agent",
  slug: "change-page-page-property-text",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value-prose",
  definition: "the whole value one text property of one page has, stated anew in other words",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The property a key names is read from the schema the index has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A key naming a text property is handed to the mechanical change stating one key anew.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key naming a page type that extends a text property is handed on the same way.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key naming any other kind of property is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That refusal names the kind of property the key names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the world names no page at is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key the page's own page type has no property for is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The value under the key is stated anew whole rather than a passage of it.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-kind/change-restated",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
} as const satisfies ChangeAgent
