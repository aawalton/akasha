import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const noInlinedFonts = {
  id: "01a0e12c-ad76-7048-91b2-329a02f7899c",
  type: "page-type/module",
  slug: "no-inlined-fonts",
  definition: "the bundler setting that keeps every font a file of its own",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A font inlined as a data address is refused by the sites' font-src 'self'.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every router app's bundler config takes this plugin rather than its own copy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file that is not a font keeps the bundler's own inlining limit.",
    },
  ],
} as const satisfies Module
