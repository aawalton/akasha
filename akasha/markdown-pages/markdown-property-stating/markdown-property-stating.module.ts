import type { Module } from "@akasha/code-system/module"

export const markdownPropertyStating = {
  id: "01a06895-1cee-7000-be20-896f63637fc2",
  pageTypeSlug: "module",
  slug: "markdown-property-stating",
  definition: "the faults, rules and vocabulary a markdown property's values are held to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "What a page type states about a property's values is the shape `@akasha/pages-system/markdown-property-stated` declares rather than a second copy of it.",
    },
  ],
} as const satisfies Module
