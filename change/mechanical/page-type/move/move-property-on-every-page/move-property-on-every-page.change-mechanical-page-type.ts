import type { ChangeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const movePropertyOnEveryPage = {
  id: "01a09c74-8e12-7590-82f3-e8a4719b2770",
  type: "page-type/change-mechanical-page-type",
  slug: "move-property-on-every-page",
  changeMode: "change-mode/change-mode-move",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "one key's value written under another key on every page of one page type",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every page the value is carried on is answered in this one answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The pages written are the pages of that page type and of every page type beneath it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Which pages hold the key is read from the values the index files for each page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type with no property under either key is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page with no value under the key read from is passed over rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page already holding the key written to is passed over rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A list holding one value becomes that value where the key written to has one value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A list holding more than one value is refused where the key written to has one value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key written to takes the place the key read from held.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key read from goes with the value that key held.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A count handed in bounds how many pages the value is moved on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run handed no count moves the value on every page with the key read from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One page's key is moved by one edit over that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page exporting no object is refused by its path.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No rung beneath is reached.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No page body is read to find out which pages hold the key.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalPageType
