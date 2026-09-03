import type { Module } from "@akasha/code-system/module"

export const addonDataWritesSkills = {
  id: "01a06837-d6c9-7413-83bc-e8a4d54c8fa5",
  pageTypeSlug: "module",
  slug: "addon-data-writes-skills",
  definition: "the skills section of a run's output, as the writes the section stands for",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A render that throws names the file it was rendering rather than failing alone.",
    },
    {
      invariantKind: "departure",
      statement: "A render runs when the write runs rather than when the section is built.",
    },
    {
      invariantKind: "departure",
      statement: "A section states its writes rather than performing them.",
    },
  ],
} as const satisfies Module
