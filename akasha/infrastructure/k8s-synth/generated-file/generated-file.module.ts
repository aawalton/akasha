import type { Module } from "@akasha/code-system/module"

export const generatedFile = {
  id: "01a06810-0b68-7fc5-b1b3-8bd0a620be5a",
  pageTypeSlug: "module",
  slug: "generated-file",
  definition: "the generated file a synth's output stands in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A generated file stands in a `generated` folder beside its synth file.",
    },
    {
      invariantKind: "departure",
      statement: "A file already holding what would be written is left alone.",
    },
  ],
} as const satisfies Module
