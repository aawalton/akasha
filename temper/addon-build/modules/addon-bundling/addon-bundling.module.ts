import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const addonBundling = {
  id: "01a090c1-e5c7-7c8e-ba27-38a6f8c8a165",
  type: "module",
  slug: "addon-bundling",
  definition: "every distributable addon's build output packed into one archive",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The build output already written is packed.",
    },
    {
      invariantKind: "departure",
      statement: "An addon with no build output refuses the pack.",
    },
    {
      invariantKind: "departure",
      statement: "Every addon on the roster is packed.",
    },
    {
      invariantKind: "departure",
      statement: "A sibling folder a manifest declares is packed with its addon.",
    },
    {
      invariantKind: "departure",
      statement: "A dependency the roster does not have is reported rather than packed.",
    },
    {
      invariantKind: "departure",
      statement:
        "Entry timestamps are fixed, so two runs over one build output give the same bytes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here compiles an addon.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says what the archive is named by.",
    },
  ],
} as const satisfies Module
