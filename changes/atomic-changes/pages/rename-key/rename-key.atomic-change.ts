import type { AtomicChange } from "../../atomic-change.page-type.ts"

export const renameKey = {
  id: "01a07312-42ab-7ae4-b3a5-b3ecceb263fc",
  pageTypeSlug: "atomic-change",
  slug: "rename-key",
  definition: "the change spelling one key and everywhere the checker resolves to it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key is named by the file declaring it rather than by the key alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which files name the declaring file is asked of the index rather than walked for.",
    },
    {
      invariantKind: "departure",
      statement: "An index that cannot answer refuses the change rather than narrowing its reach.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file carrying the key as a name as well is refused, being two things and not one.",
    },
    {
      invariantKind: "departure",
      statement: "A shorthand filling the renamed key is spelled out so the name it named is kept.",
    },
    {
      invariantKind: "departure",
      statement: "A key reached through a string keeps its quotes.",
    },
    {
      invariantKind: "departure",
      statement: "A rename refuses where any file it would change already declares the new key.",
    },
    {
      invariantKind: "departure",
      statement: "The bodies are answered rather than written, so the caller lands them as one.",
    },
  ],
} as const satisfies AtomicChange
