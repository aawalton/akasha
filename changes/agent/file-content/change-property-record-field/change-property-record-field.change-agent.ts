import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const changePropertyRecordField = {
  id: "01a081db-f317-7907-8d05-07fbaed64a3d",
  type: "change-agent",
  slug: "change-property-record-field",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value-prose",
  definition: "one field of one record a page's many-valued property has, stated anew",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The record worked is named by a field of that record rather than by its place.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the world names no page at is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Working the record out is left to the mechanical change of the same name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
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
