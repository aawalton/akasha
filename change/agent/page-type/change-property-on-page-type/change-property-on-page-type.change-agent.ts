import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const changePropertyOnPageType = {
  id: "01a09c79-ba1c-7e9b-9cd9-92761fe1627c",
  type: "change-agent",
  slug: "change-property-on-page-type",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "one property's declaration on a page type stated anew, with its pages carried",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The kind of page is read from the path rather than from the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the naming grammar reads as no page file is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page that is no page type is refused here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The declaration and the pages under it are written by this one change rather than by two.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page type is never left requiring a property a page under that page type states nowhere.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Stating the declaration anew is left to the mechanical change acting on a page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A count and a default are handed on only where the caller states them.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
