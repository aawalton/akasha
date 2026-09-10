import type { ChangeAgent } from "../../change-agent.page-type.types.ts"

export const renamePagePropertyPropertySlug = {
  id: "01a0819e-9047-7f45-850f-d66e47cf03e4",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "rename-page-property-property-slug",
  changeMode: "change-mode-rename",
  changeTargetType: "change-target-type/page-property",
  changeTargetSubtype: "change-target-subtype/page-property-property-slug",
  definition: "one property's key spelled anew on that property's page and on every page with it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The key spelled anew is the one the property's page states under `property-slug`.",
    },
    {
      invariantKind: "departure",
      statement: "The pages written are the pages of every page type declaring that property.",
    },
    {
      invariantKind: "departure",
      statement: "A page of a page type beneath a declaring page type is written too.",
    },
    {
      invariantKind: "departure",
      statement:
        "An entry shape declaring the property has the key spelled anew in every entry beside a page.",
    },
    {
      invariantKind: "departure",
      statement:
        "The pages whose entries are written are the pages of every page type with that shape.",
    },
    {
      invariantKind: "departure",
      statement: "Every file the entries of one page run to is written.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating no value under that key is passed over rather than refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which pages have the key is read from the values the index files for each page type.",
    },
    {
      invariantKind: "absence",
      statement: "No page body is read to find out which pages have the key.",
    },
    {
      invariantKind: "departure",
      statement: "A count handed in holds how many pages the key is spelled anew on.",
    },
    {
      invariantKind: "departure",
      statement: "A run handed a count states no slug on the property's own page.",
    },
    {
      invariantKind: "departure",
      statement: "A run handed a count spells no signature anew.",
    },
    {
      invariantKind: "departure",
      statement: "A run handed a count spells no key anew in a file of entries.",
    },
    {
      invariantKind: "departure",
      statement: "A run handed no count spells the key anew on every page with that key.",
    },
    {
      invariantKind: "departure",
      statement: "A count that is no whole number above nothing is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The member each declaring page type declares is spelled anew beside the key.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every file a file property's key names is carried to the name the new key spells.",
    },
    {
      invariantKind: "departure",
      statement:
        "A record declaring the property as a field has the key spelled anew in each of its records.",
    },
    {
      invariantKind: "departure",
      statement:
        "The pages whose records are written are the pages of every page type declaring that record.",
    },
    {
      invariantKind: "gap",
      statement: "A value a page keeps beside the page rather than in it has its key spelled anew.",
    },
    {
      invariantKind: "departure",
      statement: "The key the records sit under is the one the record's page states.",
    },
    {
      invariantKind: "departure",
      statement: "The field the record's own type declares is spelled anew beside the key.",
    },
    {
      invariantKind: "departure",
      statement: "That type is named as every type the record's page declares.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating no `property-slug` is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "The property slug the page already has is refused where no former key is handed in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A former key handed in is spelled anew though the property's page already states its new slug.",
    },
    {
      invariantKind: "departure",
      statement:
        "Such a run states no slug on the property's own page and spells no signature anew.",
    },
    {
      invariantKind: "departure",
      statement: "A former key that is the slug the property's page has is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A slug that is not lower kebab case is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property no page type, record or entry shape declares is refused rather than answered empty.",
    },
    {
      invariantKind: "departure",
      statement: "A run spelling the key anew on no page is refused rather than answered as done.",
    },
    {
      invariantKind: "departure",
      statement:
        "Each change this one composes is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
