import type { ChangeMechanicalFileContent } from "akasha/changes/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const renameEntryKey = {
  id: "01a08763-9f88-79a2-8f08-e50cbca9c517",
  type: "change-mechanical-file-content",
  slug: "rename-entry-key",
  changeMode: "change-mode/change-mode-rename",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-entry-key",
  definition: "one key of every entry beside a page spelled anew, keeping its place and its value",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key alone is respelled.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key keeps the place it had among the keys of its entry.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every entry stating that key is respelled.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry stating no such key is passed over rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key inside a value an entry states is left as that key is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The passage answered runs from the first entry respelled to the last rather than the body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One passage is answered however many entries are respelled.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body stating that key in no entry answers no edit rather than being refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body whose entry already states the key asked for is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body that is no run of JSON objects is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The body worked on is the body the world answers rather than the body on disk.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the index.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFileContent
