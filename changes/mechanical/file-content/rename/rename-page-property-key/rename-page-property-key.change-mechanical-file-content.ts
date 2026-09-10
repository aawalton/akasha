import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.types.ts"

export const renamePagePropertyKey = {
  id: "01a08199-2188-7b83-8ede-a4feb5dd9765",
  pageTypeSlug: "change-mechanical-file-content",
  type: "change-mechanical-file-content",
  slug: "rename-page-property-key",
  changeMode: "change-mode-rename",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-key",
  definition:
    "one key of a page's exported object, or of each record a key of it holds, spelled anew",
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
      statement: "A body stating no such key in the exported object is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A body already stating the key asked for is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "The key respelled sits in the exported object itself where no holding key is named.",
    },
    {
      invariantKind: "departure",
      statement: "A holding key named respells the key in each record that key states.",
    },
    {
      invariantKind: "departure",
      statement: "A record stating no such key is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "The same key in the exported object itself is left as it is.",
    },
    {
      invariantKind: "departure",
      statement: "Records sitting apart answer an edit each.",
    },
    {
      invariantKind: "departure",
      statement: "Records stating that key nowhere answer no edit rather than being refused.",
    },
    {
      invariantKind: "departure",
      statement: "A holding key stating no list of records answers no edit.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
