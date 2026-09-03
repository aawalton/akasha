import type { Module } from "@akasha/code-system/module"

export const storageStateReading = {
  id: "01a0659d-b1ba-7002-af95-6de723e71593",
  pageTypeSlug: "module",
  slug: "storage-state-reading",
  definition: "the sign-in a Playwright storage state carries, and how fresh that sign-in is",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The sign-in is read from the auth cookie rather than from a file of its own.",
    },
    {
      invariantKind: "departure",
      statement: "An auth cookie the browser split into chunks is joined back in chunk order.",
    },
    {
      invariantKind: "departure",
      statement: "A token expiring within ten minutes is not fresh.",
    },
    {
      invariantKind: "departure",
      statement: "Anything that will not decode asks for a new export rather than refusing.",
    },
    {
      invariantKind: "departure",
      statement: "Only a single unsplit base64 auth cookie is rewritten in place.",
    },
    {
      invariantKind: "departure",
      statement: "A rewritten cookie past the chunk limit is refused rather than written split.",
    },
    {
      invariantKind: "departure",
      statement: "Every field the storage state carried besides the cookies is kept.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here asks for a new token.",
    },
  ],
} as const satisfies Module
