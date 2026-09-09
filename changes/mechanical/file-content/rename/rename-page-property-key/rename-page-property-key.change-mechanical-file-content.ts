import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const renamePagePropertyKey = {
  id: "01a08199-2188-7b83-8ede-a4feb5dd9765",
  pageTypeSlug: "change-mechanical-file-content",
  slug: "rename-page-property-key",
  changeMode: "change-mode-rename",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-key",
  definition: "one key of a page's exported object spelled anew, keeping its place and its value",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The key alone is respelled, and the value stated under it is left as it is.",
    },
    {
      invariantKind: "departure",
      statement: "The key keeps the place it had among the object's keys.",
    },
    {
      invariantKind: "departure",
      statement: "A key spelled as a string is respelled as a string.",
    },
    {
      invariantKind: "departure",
      statement: "The passage answered is the lines the key sits on rather than the body.",
    },
    {
      invariantKind: "departure",
      statement: "A body exporting no object is refused rather than respelled.",
    },
    {
      invariantKind: "departure",
      statement: "A body stating no such key is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A body already stating the key asked for is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
