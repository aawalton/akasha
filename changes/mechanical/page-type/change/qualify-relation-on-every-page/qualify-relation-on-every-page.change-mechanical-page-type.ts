import type { ChangeMechanicalPageType } from "akasha/changes/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const qualifyRelationOnEveryPage = {
  id: "01a0a06b-4165-7143-9eb8-553a0c1114ec",
  type: "change-mechanical-page-type",
  slug: "qualify-relation-on-every-page",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition:
    "a bare name written anew with the page type it reaches, on every page of one page type",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Every page naming a page by a bare name under the key is answered in this one answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which pages name a page by a bare name is read from the values the index files.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The pages written are the pages of that page type and of every page type beneath it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page type written is the one the page reached is of.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "That page type is read off the page reached rather than off what the property declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page type of the page reached is read off the name of that page's file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One page's property is answered by one edit over that property.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name already stating its page type is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name that is an id is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name reaching no page refuses the whole change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name reaching more than one page refuses the whole change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal names the page that drew the refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key declaring no page type to reach is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "What a key declares is read off the property page that key names rather than off the key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key the page type declares nowhere is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A field named beside the key is written inside each of that key's entries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What a field declares is read off the record property the key names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A field the record property declares nowhere is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run naming no field writes the key's own value.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No rung beneath is reached.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes the property's declaration.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No name is written with a scope.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalPageType
