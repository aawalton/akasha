import type { ChangeMechanical } from "akasha/changes/mechanical/change-mechanical.page-type.types.ts"

export const renamePagePropertyPropertySlug = {
  id: "01a09c4e-1d8f-7a8e-9ce5-727b72e2b55d",
  type: "change-mechanical",
  slug: "rename-page-property-property-slug",
  changeMode: "change-mode/change-mode-rename",
  changeTargetType: "change-target-type/page-property",
  changeTargetSubtype: "change-target-subtype/page-property-property-slug",
  definition: "one property's key spelled anew on that property's page and on every page with it",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The key spelled anew is the one the property's page states under `property-slug`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The pages written are the pages of every page type declaring that property.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page of a page type beneath a declaring page type is written too.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An entry shape declaring the property has the key spelled anew in every entry beside a page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The pages whose entries are written are the pages of every page type with that shape.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every file the entries of one page run to is written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page stating no value under that key is passed over rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Which pages have the key is read from the values the index files for each page type.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No page body is read to find out which pages have the key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A count handed in holds how many pages the key is spelled anew on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run handed a count states no slug on the property's own page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run handed a count spells no signature anew.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run handed a count spells no key anew in a file of entries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run handed no count spells the key anew on every page with that key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The member each declaring page type declares is spelled anew beside the key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That member is spelled anew in the file the page type states its type in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Every file a file property's key names is carried to the name the new key spells.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every body naming a file so carried names the path that file landed at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A record declaring the property as a field has the key spelled anew in each of its records.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The pages whose records are written are the pages of every page type declaring that record.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A value a page keeps beside the page rather than in it has its key spelled anew.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key the records sit under is the one the record's page states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The field the record's own type declares is spelled anew beside the key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That type is named as every type the record's page declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page stating no `property-slug` is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The property slug the page already has is refused where no former key is handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A former key handed in is spelled anew though the property's page already states its new slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Such a run states no slug on the property's own page and spells no signature anew.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A former key that is the slug the property's page has is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug that is not lower kebab case is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A property no page type or record or entry shape declares is refused rather than answered empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run spelling the key anew on no page is refused rather than answered as done.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One body is read once however many passages of it are spelled anew.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The passages of one body land as one answer over that body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A signature is spelled anew over the bodies the keys were already spelled in.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches a change.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanical
