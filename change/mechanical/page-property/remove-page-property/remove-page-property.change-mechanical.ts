import type { ChangeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.types.ts"

export const removePageProperty = {
  id: "01a09c75-f89f-7276-9b93-86898be2b3a2",
  type: "page-type/change-mechanical",
  slug: "remove-page-property",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/page-property",
  changeTargetSubtype: "change-target-subtype/page-property",
  definition:
    "a page property taken away, off every page, record and entry, and off every declaration",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The property taken away is the page the address handed in names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The key taken off each page is the one that property's page states under `property-slug`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pages losing the key are the pages of every page type declaring that property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page of a page type beneath a declaring page type loses the key too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating no value under that key is passed over rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Which pages have the key is read from the values the index files for each page type.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page body is read to find out which pages have the key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every page type, record property and entry shape declaring it loses the record declaring it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The key goes out of every record a page states under a record property declaring it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pages holding those records are the pages of every page type declaring that record.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The key goes out of every entry in every file of entries under a shape declaring it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The files of entries reached are the files beside every page stating that shape's key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry stating no value under that key is passed over rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A record property or entry shape declaring it that no page type declares is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A record property or entry shape declaring it that sits inside another record is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No key is taken out of a record inside an entry or inside a record.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page naming the property among its parts loses that entry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page naming the property by its slug alone loses that entry as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The property's own page goes, and every file that page claims beside it goes with it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file property's key names a file beside each page, and that file goes with the key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page the property's own page claims is taken away rather than spliced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One body is read once however many passages of it go.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The passages of one body land as one answer over that body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A key a page type declares as required goes beside that declaration rather than being refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property no page type declares has its page taken away all the same.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An address naming no page property is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page stating no `property-slug` is no page property, so its address is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No file a page type generates is written here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches a change.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanical
