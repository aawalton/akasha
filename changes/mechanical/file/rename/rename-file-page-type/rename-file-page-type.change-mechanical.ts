import type { ChangeMechanical } from "akasha/changes/mechanical/change-mechanical.page-type.types.ts"

export const renameFilePageType = {
  id: "01a0828e-5e7f-724c-b387-7d19c7622f00",
  type: "change-mechanical",
  slug: "rename-file-page-type",
  changeMode: "change-mode-rename",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page-type",
  definition: "a page type renamed, in its own name and in every page filed under that page type",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  guards: ["change-guard/claimed-file-not-left-behind"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path naming no page type is refused here.",
    },
    {
      invariantKind: "departure",
      statement: "The page type's own file is renamed by the change renaming a page.",
    },
    {
      invariantKind: "departure",
      statement: "The plural a page type becomes is handed on to that same change.",
    },
    {
      invariantKind: "departure",
      statement: "The pages filed under the page type are read before that own file is renamed.",
    },
    {
      invariantKind: "departure",
      statement: "Each such page's slug is read from that page's file name rather than its body.",
    },
    {
      invariantKind: "departure",
      statement: "Every page's address is restated over one reading of the bodies.",
    },
    {
      invariantKind: "departure",
      statement: "That restating comes before any file a page claims is moved.",
    },
    {
      invariantKind: "departure",
      statement: "A page type with no page has no address restated.",
    },
    {
      invariantKind: "departure",
      statement: "Every page of the page type is carried by one call to the rung acting on them.",
    },
    {
      invariantKind: "departure",
      statement: "That call comes before the page type's own file is renamed.",
    },
    {
      invariantKind: "departure",
      statement: "The files a page claims are read while the page type still declares them.",
    },
    {
      invariantKind: "departure",
      statement: "A file the rename leaves behind is refused by the guard named here.",
    },
    {
      invariantKind: "departure",
      statement: "The type a page type's worked file exports is spelled from the new slug.",
    },
    {
      invariantKind: "departure",
      statement: "A body importing that worked type imports the type the new slug names.",
    },

    {
      invariantKind: "departure",
      statement: "A body importing the type a page type's types file exports imports the new name.",
    },
    {
      invariantKind: "departure",
      statement: "A page's file is read from the index as the page type's own rename left it.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanical
