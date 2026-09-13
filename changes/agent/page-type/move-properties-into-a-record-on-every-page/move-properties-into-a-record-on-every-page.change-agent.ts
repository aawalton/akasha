import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const movePropertiesIntoARecordOnEveryPage = {
  id: "01a09bd6-3151-75d6-91ec-a0ad2ffd6c23",
  type: "change-agent",
  slug: "move-properties-into-a-record-on-every-page",
  changeMode: "change-mode-move",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "several keys gathered into one record on every page of one page type",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The pages written are the pages of that page type and of every page type beneath that type.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which pages have the keys is read from the values the index files for each page type.",
    },
    {
      invariantKind: "absence",
      statement: "No page body is read to find out which pages have the keys.",
    },
    {
      invariantKind: "departure",
      statement: "A page type with no property under one of the keys is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page type holding one value under the key written to is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The record spells its fields in the order the keys are handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A key the page states no value under is left out of the record.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating none of the keys is passed over rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page missing a key named as needed is passed over rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page already with the key written to is passed over rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A key named as needed and not gathered is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The record is put in after the first key gathered from that page.",
    },
    {
      invariantKind: "departure",
      statement: "Every key gathered from a page is taken off that page.",
    },
    {
      invariantKind: "departure",
      statement: "A count handed in holds how many pages the record is written on.",
    },
    {
      invariantKind: "departure",
      statement: "A run handed no count writes the record on every page holding the keys.",
    },
    {
      invariantKind: "departure",
      statement: "A count that is no whole number above nothing is refused.",
    },
    {
      invariantKind: "departure",
      statement: "One page refused refuses the whole change.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the page that drew the refusal.",
    },
    {
      invariantKind: "departure",
      statement: "Each page is reached over the edits the pages before that page left.",
    },
    {
      invariantKind: "departure",
      statement:
        "Putting the record in and taking the keys out are left to two mechanical changes.",
    },
    {
      invariantKind: "departure",
      statement:
        "Each change composed here is reached through the runner rather than by an import.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeAgent
