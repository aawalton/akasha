import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const decodeHarnessScript = {
  id: "01a0910c-50a4-7b5a-8f18-530ddf42c6ea",
  type: "module",
  slug: "decode-harness-script",
  definition: "the script that builds an app's decode harness and runs it on a simulator",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One script is written for each app whose page names a decode harness program.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The components the script compiles are those the harness's ios-program page names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file the script names is read from the index rather than spelled here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches a machine.",
    },
  ],
} as const satisfies Module
