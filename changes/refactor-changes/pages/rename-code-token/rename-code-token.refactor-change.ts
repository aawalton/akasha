import type { RefactorChange } from "../../refactor-change.page-type.ts"

export const renameCodeToken = {
  id: "01a07317-1ec5-738d-900f-85dc7a57988d",
  pageTypeSlug: "refactor-change",
  slug: "rename-code-token",
  definition: "a name a code file declares renamed wherever it reaches, exported or not",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An exported name is renamed by the export rename, which reaches every importer.",
    },
    {
      invariantKind: "departure",
      statement: "A name no export carries is renamed by the local rename over its own file.",
    },
    {
      invariantKind: "departure",
      statement: "Which of the two runs is read off the exports rather than said by the caller.",
    },
    {
      invariantKind: "departure",
      statement: "A line names which declaration is renamed where a file declares the name twice.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal from the change this runs is answered as this change's own refusal.",
    },
    {
      invariantKind: "departure",
      statement: "The bodies are answered rather than written, so the caller lands them as one.",
    },
    {
      invariantKind: "gap",
      statement:
        "A name a file declares at its top and exports nowhere is refused rather than renamed.",
    },
  ],
} as const satisfies RefactorChange
