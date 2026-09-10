import type { ChangeMechanical } from "../../../change-mechanical.page-type.types.ts"

export const renameFilePage = {
  id: "01a08239-8d1d-7b49-a5c2-fc039de37378",
  pageTypeSlug: "change-mechanical",
  type: "change-mechanical",
  slug: "rename-file-page",
  changeMode: "change-mode-rename",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page",
  definition: "a page renamed and moved to where its slug says, in the data and in every name",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  guards: ["change-guard/claimed-file-not-left-behind"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page's files are moved before that page's slug is restated.",
    },
    {
      invariantKind: "departure",
      statement: "The slug is restated at the path the move lands the page at.",
    },
    {
      invariantKind: "departure",
      statement: "The keys with a file are read from the page's own type.",
    },
    {
      invariantKind: "departure",
      statement: "A key that type does not declare is looked for among every page property.",
    },
    {
      invariantKind: "absence",
      statement: "Which properties a page type holds in a file is answered nowhere here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type holding a secret or an uncommitted value keeps that value beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "A file under a reserved tail is moved with the page that file sits beside.",
    },
    {
      invariantKind: "departure",
      statement: "A reserved tail with no body is moved nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "A page owning its folder takes every file under that folder with it.",
    },
    {
      invariantKind: "departure",
      statement: "Such a file keeps its place beneath the folder that page lands in.",
    },
    {
      invariantKind: "departure",
      statement: "A page type owning its folder lands in the folder its new plural names.",
    },
    {
      invariantKind: "departure",
      statement: "A page type whose folder already names that plural keeps the folder it has.",
    },
    {
      invariantKind: "departure",
      statement: "A page type renamed with no plural handed in keeps the folder it has.",
    },
    {
      invariantKind: "departure",
      statement: "A file the page has already is moved once rather than a second time.",
    },
    {
      invariantKind: "departure",
      statement: "A file under no TypeScript name is moved by the change moving a file alone.",
    },
    {
      invariantKind: "departure",
      statement: "The type a page's file exports is spelled anew beside the const it exports.",
    },
    {
      invariantKind: "departure",
      statement: "A file exporting no type named from the old slug is left as that file is.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest naming a moved file as a way in states the new path for that way.",
    },
    {
      invariantKind: "departure",
      statement: "A way whose name closes with the old slug closes with the new slug instead.",
    },
    {
      invariantKind: "departure",
      statement: "A body reaching the page through the old way reaches the page through the new.",
    },
    {
      invariantKind: "departure",
      statement: "A page no manifest names as a way in leaves every manifest as that manifest is.",
    },
    {
      invariantKind: "departure",
      statement: "The address a page's slug names is restated wherever a body spells that address.",
    },
    {
      invariantKind: "departure",
      statement: "The address is restated before any file the page keeps beside it is moved.",
    },
    {
      invariantKind: "departure",
      statement: "A page type scoping its slug names that scope in the address restated.",
    },
    {
      invariantKind: "departure",
      statement: "The scope is what the page carries under the property scoping that page type.",
    },
    {
      invariantKind: "departure",
      statement: "A scope naming its own page type is taken as the slug that name closes with.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page carrying nothing under that property is addressed as though scoped by none.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file the page claims and the rename leaves behind is refused by the guard named here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A way's name is restated though the reached move restated that way's path already.",
    },
    {
      invariantKind: "departure",
      statement: "A call saying every address is restated already has no address restated here.",
    },
    {
      invariantKind: "departure",
      statement: "A call wrongly saying so leaves the addresses left out as those addresses are.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanical
