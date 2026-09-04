import type { Module } from "@akasha/code-system/module"

export const seatAkashaRead = {
  id: "01a06949-b281-701f-825a-4790c9603a69",
  pageTypeSlug: "module",
  slug: "seat-akasha-read",
  definition: "a seat's values read from akasha, answered under the key names the old page used",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each value a seat states is answered under the key name the old page used.",
    },
    {
      invariantKind: "departure",
      statement: "A title is answered as the seat's slug, since akasha holds none.",
    },
    {
      invariantKind: "departure",
      statement: "A value that is empty or missing is left out rather than answered as null.",
    },
    {
      invariantKind: "departure",
      statement: "The seats are named by the index, so no page is opened to find them.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's activity is when what is observed of it was last written.",
    },
    {
      invariantKind: "departure",
      statement: "A replaced context is answered with its source and the moment it happened.",
    },
  ],
} as const satisfies Module
