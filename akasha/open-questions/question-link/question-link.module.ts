import type { Module } from "@akasha/code-system/module"

export const questionLink = {
  id: "01a05c99-9dac-748e-b9cb-022b25c53f85",
  pageTypeSlug: "module",
  slug: "question-link",
  definition: "a link a question carries for its reader to follow",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A link states the platform the link opens on.",
    },
    {
      invariantKind: "departure",
      statement: "The platforms a link opens on are the web and the native shell.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a link.",
    },
  ],
} as const satisfies Module
