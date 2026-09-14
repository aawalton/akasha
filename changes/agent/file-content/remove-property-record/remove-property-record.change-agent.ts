import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const removePropertyRecord = {
  id: "01a081ee-d2ea-7846-af0b-049ae0500371",
  type: "change-agent",
  slug: "remove-property-record",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "one record taken out of one page property, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The record taken out is named by a field of that record rather than by its place.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the world names no page at is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Taking the record out is left to the mechanical change of the same name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No record taken out is resolved.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-kind/change-authored",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
} as const satisfies ChangeAgent
