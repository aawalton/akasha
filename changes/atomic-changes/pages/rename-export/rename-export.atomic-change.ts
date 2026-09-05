import type { AtomicChange } from "../../atomic-change.page-type.ts"

export const renameExport = {
  id: "01a07306-11a5-77c5-a8d6-6f609f0223b1",
  pageTypeSlug: "atomic-change",
  slug: "rename-export",
  definition: "the change spelling one export and everything that names it anew",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An export is spelled anew in a code file rather than in a page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page's export is its slug, and renaming that is a slug rename rather than this.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which files name the declaring file is asked of the index rather than walked for.",
    },

    {
      invariantKind: "departure",
      statement: "A rename refuses where any file it would change already reaches the new name.",
    },
    {
      invariantKind: "departure",
      statement: "A shorthand keeps its key and points its value at the new name.",
    },
    {
      invariantKind: "departure",
      statement: "A name imported under another name is left as that name is.",
    },
    {
      invariantKind: "departure",
      statement: "The bodies are answered rather than written, so the caller lands them as one.",
    },
  ],
} as const satisfies AtomicChange
