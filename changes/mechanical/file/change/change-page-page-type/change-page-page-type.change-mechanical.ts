import type { ChangeMechanical } from "akasha/changes/mechanical/change-mechanical.page-type.types.ts"

export const changePagePageType = {
  id: "01a09ca3-94da-7d4d-9aea-0e05b2ce3f33",
  type: "change-mechanical",
  slug: "change-page-page-type",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page",
  definition: "one page stated as another page type, in the data and in every file name",
  code: "ts",
  test: "ts",
  guards: [
    "change-guard/import-reaches-a-file",
    "change-guard/relation-reaches-a-page",
    "change-guard/slug-names-one-property",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The page type a page moves to is named by the path of that page type's page.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every file beside a page whose name carries the old page type states the new one instead.",
    },
    {
      invariantKind: "departure",
      statement: "A file whose name a property fixes is left where that file is.",
    },
    {
      invariantKind: "departure",
      statement:
        "The modules restating an address, a page type and a body's names are called rather than reached.",
    },
    {
      invariantKind: "departure",
      statement: "The body's page type and the type it satisfies are restated in the same answer.",
    },
    {
      invariantKind: "departure",
      statement: "A body naming a path that moved is repointed in the same answer.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside the page is read for holding a body rather than for holding text.",
    },
    {
      invariantKind: "departure",
      statement: "An address the page type moves is restated wherever a body spells that address.",
    },
    {
      invariantKind: "departure",
      statement: "An address is restated before any file the page keeps beside it is carried.",
    },
    {
      invariantKind: "departure",
      statement: "The body states its new page type before any file beside that body is carried.",
    },
    {
      invariantKind: "departure",
      statement: "The file moved is moved by the rung this change reaches.",
    },
    {
      invariantKind: "departure",
      statement: "The guards the modules called cannot name are named here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here changes the slug a page states.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads an argument off the command line.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanical
