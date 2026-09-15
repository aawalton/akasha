import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const fileRead = {
  id: "01a05bd6-c530-7caa-8cc1-55059f494d6f",
  type: "module",
  slug: "file-read",
  definition: "file-backed pages read from the tree",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A narrow the pages run is sent as a test.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A narrow on a path asks for the property that path starts at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every narrow is run again over the rows the answer has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row the pages answer has the page's values and no path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page's id and slug are read off the values that page has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Rows are ordered here rather than by the pages.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A limit takes rows out of that ordering rather than asking the pages for fewer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A limit therefore bounds the rows a reader is handed and not the bytes read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A select bounds the bytes read, by naming the keys the pages are asked for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page reached by the suffix of its id is asked for the same keys.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The keys asked for carry a page's id, slug and title however the select reads.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cursor marks where a listing left off in that order.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run held for a cursor is dropped once that run has been idle a minute.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A held run is dropped once the rows held reach two hundred thousand.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A question the pages refuse is raised rather than read as a page type holding no page.",
    },
  ],
} as const satisfies Module
