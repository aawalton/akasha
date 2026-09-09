import type { Module } from "@akasha/code/module"

export const mediaVariants = {
  id: "01a0655d-daa8-76c6-b357-2030d862a2a0",
  pageTypeSlug: "module",
  type: "module",
  slug: "media-variants",
  definition: "the voices and renditions a page's media is held in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The personas with a voice reference are picked out of the rows rather than in the question.",
    },
  ],
} as const satisfies Module
