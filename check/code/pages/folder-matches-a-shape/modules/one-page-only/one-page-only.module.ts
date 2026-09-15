import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const onePageOnly = {
  id: "01a09d18-8d7c-7838-a182-93dea1d06ca2",
  type: "module",
  slug: "one-page-only",
  definition: "what the shapes of a folder headed by one page all say alike",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder with no page of its own is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder with a page more than the one it answers for is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which second page the folder answers for is handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file in the folder that is no part of the page is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which files are parts is handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder named other than what its page calls it is refused.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges the folders under the folder.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges what page type the page is.",
    },
  ],
} as const satisfies Module
