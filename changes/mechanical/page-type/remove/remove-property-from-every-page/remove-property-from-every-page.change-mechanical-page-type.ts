import type { ChangeMechanicalPageType } from "akasha/changes/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const removePropertyFromEveryPage = {
  id: "01a09c63-5870-7998-bc5b-27a07babaa75",
  type: "change-mechanical-page-type",
  slug: "remove-property-from-every-page",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "one key taken off every page of one page type, with the values that key holds",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every page holding the key is answered in this one answer.",
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
      statement: "One page's key goes by one edit over that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key a page type here requires is refused for that page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Whether the key is required is read once for each page type rather than once for each page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page type no page of which holds the key is refused rather than answered as no edit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A count handed in bounds how many pages the key goes from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run handed no count takes the key from every page holding it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page whose body states no such key is answered as no edit.",
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
