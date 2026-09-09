import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const renameEntryKey = {
  id: "01a08763-9f88-79a2-8f08-e50cbca9c517",
  pageTypeSlug: "change-mechanical-file-content",
  slug: "rename-entry-key",
  changeMode: "change-mode-rename",
  changeTargetType: "change-target-type/file-content",
  definition: "one key of every entry beside a page spelled anew, keeping its place and its value",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The key alone is respelled, and the value stated under it is left as it is.",
    },
    {
      invariantKind: "departure",
      statement: "The key keeps the place it had among the keys of its entry.",
    },
    {
      invariantKind: "departure",
      statement: "Every entry stating that key is respelled.",
    },
    {
      invariantKind: "departure",
      statement: "An entry stating no such key is passed over rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A key inside a value an entry states is left as that key is.",
    },
    {
      invariantKind: "departure",
      statement:
        "The passage answered runs from the first entry respelled to the last rather than the body.",
    },
    {
      invariantKind: "departure",
      statement: "One passage is answered however many entries are respelled.",
    },
    {
      invariantKind: "departure",
      statement: "A body stating that key in no entry is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A body whose entry already states the key asked for is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is no run of JSON objects is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The body worked on is the body the world answers rather than the body on disk.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
