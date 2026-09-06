import type { ChangePartial } from "../../change-partial.page-type.ts"

export const respellExport = {
  id: "01a07651-187f-7ce5-a806-842a471da594",
  pageTypeSlug: "change-partial",
  slug: "respell-export",
  definition: "a name one body exports spelled anew across the paths a caller hands in",
  code: "ts",
  test: "ts",
  isCommand: false,
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The paths the naming is read across are handed in rather than asked of an index.",
    },
    {
      invariantKind: "departure",
      statement: "A name is found from the declaration the declaring file exports under that name.",
    },
    {
      invariantKind: "departure",
      statement: "A file exporting no such name is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A name nothing spells is refused.",
    },
    {
      invariantKind: "departure",
      statement: "One place is spelled once however many readings answer at that place.",
    },
    {
      invariantKind: "departure",
      statement: "A file that would change and already reaches the new name is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A body is spliced from its last place back.",
    },
    {
      invariantKind: "departure",
      statement: "A shorthand keeps its key and points its value at the new name.",
    },
    {
      invariantKind: "departure",
      statement: "The bodies are answered rather than written.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "departure",
      statement: "The caller asks the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges whether the name a body carries is a page's own.",
    },
  ],
} as const satisfies ChangePartial
