import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const removePropertyRecord = {
  id: "01a081ee-d2ea-7846-af0b-049ae0500371",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "remove-property-record",
  changeMode: "change-mode-remove",
  definition: "one record taken out of one page property, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The record taken out is named by a field of that record rather than by its place.",
    },
    {
      invariantKind: "departure",
      statement: "A path the world names no page at is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Taking the record out is left to the mechanical change of the same name.",
    },
    {
      invariantKind: "departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "absence",
      statement: "No record taken out is resolved.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
