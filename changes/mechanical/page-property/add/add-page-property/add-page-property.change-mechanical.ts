import type { ChangeMechanical } from "akasha/changes/mechanical/change-mechanical.page-type.types.ts"

export const addPageProperty = {
  id: "01a09ff4-6a60-718d-b04e-092d69a04580",
  type: "change-mechanical",
  slug: "add-page-property",
  changeMode: "change-mode-add",
  changeTargetType: "change-target-type/page-property",
  changeTargetSubtype: "change-target-subtype/page-property",
  definition:
    "one page property made, with its page, its part, every declaration of it and every page's key",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The property's own page is written whole at the path handed in.",
    },
    {
      invariantKind: "departure",
      statement: "The property's page type and slug are read from that path.",
    },
    {
      invariantKind: "departure",
      statement: "A path naming no page type a page property is is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path already holding a body is refused rather than written over.",
    },
    {
      invariantKind: "departure",
      statement: "A body exporting no object is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The key each page gains is the one that body states under `property-slug`.",
    },
    {
      invariantKind: "departure",
      statement: "A body stating no `property-slug` is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The property is named among the parts of the one page handed in for that.",
    },
    {
      invariantKind: "departure",
      statement: "A part is written in order where the index says that key is sorted.",
    },
    {
      invariantKind: "departure",
      statement: "The declaration goes into the `properties` of every page type handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration holding many values states a count, and that count is nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration holding one value states the default handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A default is spelled as text on the declaration and as its own kind on a page.",
    },
    {
      invariantKind: "departure",
      statement: "What the property's values hold is read from the page type its own page is.",
    },
    {
      invariantKind: "departure",
      statement: "A default that kind cannot hold is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration holding many values is refused a default.",
    },
    {
      invariantKind: "departure",
      statement: "The key is put on every page of those page types, holding that default.",
    },
    {
      invariantKind: "departure",
      statement: "A page of a page type beneath a declaring page type gains the key too.",
    },
    {
      invariantKind: "departure",
      statement: "Which pages gain the key is read from the values the index files for each type.",
    },
    {
      invariantKind: "absence",
      statement: "No page body is read to find out which pages gain the key.",
    },
    {
      invariantKind: "departure",
      statement: "No page gains the key where the caller states no default.",
    },
    {
      invariantKind: "departure",
      statement: "The key is written last on every page, since no page writes it yet.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no page type is refused, since nothing would declare the property.",
    },
    {
      invariantKind: "departure",
      statement: "A path naming no page type is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating that key already is refused by its path.",
    },
    {
      invariantKind: "departure",
      statement: "One body is read once however many passages it gains.",
    },
    {
      invariantKind: "departure",
      statement: "The passages of one body land as one answer over that body.",
    },
    {
      invariantKind: "absence",
      statement: "No file a page type generates beside the property's page is written here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here gives the page its `id`.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a change.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanical
