import type { ChangeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.types.ts"

export const renamePagePropertyPropertySlug = {
  id: "01a09c4e-1d8f-7a8e-9ce5-727b72e2b55d",
  type: "page-type/change-mechanical",
  slug: "rename-page-property-property-slug",
  changeMode: "change-mode/change-mode-rename",
  changeTargetType: "change-target-type/page-property",
  changeTargetSubtype: "change-target-subtype/page-property-property-slug",
  definition:
    "a property's key spelled anew on its page, on every page with it and in every view naming it",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The key spelled anew is the one the property's page states under `property-slug`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages written are the pages of every page type declaring that property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page of a page type beneath a declaring page type is written too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An entry shape declaring the property has the key spelled anew in every entry beside a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pages whose entries are written are the pages of every page type with that shape.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every file the entries of one page run to is written.",
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
      statement: "A count handed in holds how many pages the key is spelled anew on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run handed a count states no slug on the property's own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run handed a count spells no signature anew.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run handed a count spells no key anew in a file of entries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run handed no count spells the key anew on every page with that key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The member each declaring page type declares is spelled anew beside the key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That member is spelled anew in the file the page type states its type in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every file a key names beside a page is carried to the name the new key spells.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every body naming a file so carried names the path that file landed at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A record declaring the property as a field has the key spelled anew in each of its records.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pages whose records are written are the pages of every page type declaring that record.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A value a page keeps beside the page rather than in it has its key spelled anew.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key the records sit under is the one the record's page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The field the record's own type declares is spelled anew beside the key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That type is named as every type the record's page declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating no `property-slug` is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The property slug the page already has is refused where no former key is handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A former key handed in is spelled anew though the property's page already states its new slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Such a run states no slug on the property's own page and spells no signature anew.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A former key that is the slug the property's page has is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug that is not lower kebab case is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A property no page type or record or entry shape declares is refused rather than answered empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run spelling the key anew on no page is answered as no edit, saying so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One body is read once however many passages of it are spelled anew.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The passages of one body land as one answer over that body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A signature is spelled anew over the bodies the keys were already spelled in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches a change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file property's file and an entry shape's rows are each such a file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A view naming the property states that property's slug, spelled anew here too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The views written are the views listing a declaring page type or a page type beneath one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A view listing another page type is left as it is though it states that slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Which fields of a view name a property is read from the page property behind each field.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field holding many values has the slug spelled anew in each of them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field of a record is spelled anew in each record that field's key states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name parted by dots has the segment before the first dot spelled anew.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A view naming the property nowhere is passed over rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run handed a count spells no slug anew in a view.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanical
