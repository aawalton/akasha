import type { ChangeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const addPropertyToEveryPage = {
  id: "01a09c68-3a99-7061-b5bc-e4cbfc109390",
  type: "page-type/change-mechanical-page-type",
  slug: "add-property-to-every-page",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "one value put under one key on every page of one page type",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every page of that page type is answered in this one answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The pages written are the pages the index names of that page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type carrying no property under the key is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key the page type says carries many values is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type no page is of is refused rather than answered as no edit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key no page spells is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value that parses as no value is refused before any page is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value naming anything the body would run is no value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The value is written as the caller spells it rather than as text to quote.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An `after` the caller states places the key on every page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Where the caller states no `after`, the key lands where the pages of that page type write it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which keys a page writes is read from the value the index files for that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page the index files no value for gains the key last.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every page is placed by the pages as they were before this change ran.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One page's key comes in by one edit over that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page stating the key already is refused by its path.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No rung beneath is reached.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalPageType
