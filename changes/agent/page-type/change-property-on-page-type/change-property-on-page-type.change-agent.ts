import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const changePropertyOnPageType = {
  id: "01a09c79-ba1c-7e9b-9cd9-92761fe1627c",
  type: "change-agent",
  slug: "change-property-on-page-type",
  changeMode: "change-mode-change",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "one property's declaration on a page type stated anew, with its pages carried",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The kind of page is read from the path rather than from the index.",
    },
    {
      invariantKind: "departure",
      statement: "A path the naming grammar reads as no page file is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page that is no page type is refused here.",
    },
    {
      invariantKind: "departure",
      statement:
        "The declaration and the pages under it are written by this one change rather than by two.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type is never left requiring a property a page under that page type states nowhere.",
    },
    {
      invariantKind: "departure",
      statement:
        "Stating the declaration anew is left to the mechanical change acting on a page type.",
    },
    {
      invariantKind: "departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "departure",
      statement: "A count and a default are handed on only where the caller states them.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
