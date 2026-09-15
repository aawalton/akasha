import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatAkashaRead = {
  id: "01a06949-b281-701f-825a-4790c9603a69",
  type: "module",
  slug: "seat-akasha-read",
  definition: "a seat's values read from akasha, answered under the key names the old page used",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each value a seat states is answered under the key name the old page used.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A title is answered as the seat's slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value naming a page is answered as the slug alone, and an assignment whole.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value that is empty or missing is left out rather than answered as null.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The seats are named by the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No page is opened to find the seats.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A seat's activity is the moment the values observed of the seat were last written.",
    },
  ],
} as const satisfies Module
