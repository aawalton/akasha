import type { ChangeMechanical } from "../../../change-mechanical.page-type.ts"

export const renameFilePage = {
  id: "01a08239-8d1d-7b49-a5c2-fc039de37378",
  pageTypeSlug: "change-mechanical",
  slug: "rename-file-page",
  changeModeSlug: "change-mode-rename",
  changeTargetTypeSlug: "change-target-type/file",
  changeTargetSubtypeSlug: "change-target-subtype/file-page",
  definition: "a page renamed and carried to where its slug says, in the data and in every name",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A page type's own file is refused here, its slug being renamed by another change.",
    },
    {
      invariantKind: "departure",
      statement: "A page's files are carried before that page's slug is restated.",
    },
    {
      invariantKind: "departure",
      statement: "The slug is restated at the path the carry lands the page at.",
    },
    {
      invariantKind: "departure",
      statement: "The keys holding a file are read from the page's own type.",
    },
    {
      invariantKind: "departure",
      statement: "A key that type does not declare is looked for among every page property.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type holding a secret or an uncommitted value keeps that value beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "A file under a reserved tail is carried with the page that file sits beside.",
    },
    {
      invariantKind: "departure",
      statement: "A reserved tail holding no body is carried nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "A file under no TypeScript name is carried by the change carrying a file alone.",
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
      statement: "A manifest naming a carried file as a way in states the new path for that way.",
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
      statement: "The address is restated before any file the page keeps beside it is carried.",
    },
  ],
} as const satisfies ChangeMechanical
