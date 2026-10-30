import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const removePropertyRecord = {
  id: "01a081ee-d2ea-7846-af0b-049ae0500371",
  type: "page-type/change-agent",
  slug: "remove-property-record",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "a change that removes a value from a record property of a page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The record taken out is named by a field of that record rather than by its place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the world names no page at is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Taking the record out is left to the mechanical change of the same name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No record taken out is resolved.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-kind/change-authored",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
  createdAt: "2026-09-08T16:51:47.562Z",
  updatedAt: "2026-10-30T17:04:02.838Z",
} as const satisfies ChangeAgent
