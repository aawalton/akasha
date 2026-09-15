import type { ChangeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.types.ts"

export const renameFilePage = {
  id: "01a08239-8d1d-7b49-a5c2-fc039de37378",
  type: "change-mechanical",
  slug: "rename-file-page",
  changeMode: "change-mode/change-mode-rename",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page",
  definition: "a page renamed and moved to where its slug says, in the data and in every name",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page's files are moved before that page's slug is restated.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The slug is restated at the path the move lands the page at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The keys with a file are read from the page's own type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key that type does not declare is looked for among every page property.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Which properties a page type holds in a file is answered nowhere here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page type holding a secret or an uncommitted value keeps that value beside the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file under a reserved tail is moved with the page that file sits beside.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reserved tail with no body is moved nowhere.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page owning its folder takes every file under that folder with the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Such a file keeps its place beneath the folder that page lands in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page in a folder named for what its slug adds keeps a folder named that way.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What the slug adds is what the folder's own name leaves off the front.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page naming itself by what its old slug adds names itself by what the new adds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page naming itself otherwise keeps the name that page states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A new slug opening otherwise lands the page in a folder named for the whole.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type owning its folder keeps the folder that page type has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file the page has already is moved once rather than a second time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every file the rename carries is moved by one call to the change moving many.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The type a page's file exports is spelled anew beside the const that file exports.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The name a page's code file exports from the old slug is spelled anew too.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which name a file exports under the old slug is answered by one module.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A manifest naming a moved file as a way in states the new path for that way.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A way whose name closes with the old slug closes with the new slug instead.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body reaching the page through the old way reaches the page through the new.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page no manifest names as a way in leaves every manifest as that manifest is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The modules restating an address, a slug and an export are called rather than reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The address a page's slug names is restated wherever a body spells that address.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The address is restated before any file the page keeps beside the page is moved.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type scoping its slug names that scope in the address restated.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The scope is the value the page carries under the property scoping that page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A scope naming its own page type is taken as the slug that name closes with.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page carrying nothing under that property is addressed as though scoped by nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A way's name is restated though the reached move restated that way's path already.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call saying every address is restated already has no address restated here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call wrongly saying so leaves the addresses left out as those addresses are.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file a page's type declares beside that page is moved though the page states no such key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every part of such a file that is there is moved rather than the first alone.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "One module reads the files beside a page both here and in the move of a page.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanical
