import type { Module } from "@akasha/code-system/module"

export const refactorArguing = {
  id: "01a05db8-010d-7000-aeeb-1a8d47963d5a",
  pageTypeSlug: "module",
  slug: "refactor-arguing",
  definition: "the flags a rename was called with, read off the command line",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A flag this module does not take is refused rather than passed along.",
    },
    {
      invariantKind: "departure",
      statement: "A flag said more than once is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A flag needing a value and given none is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run and a respelling inside strings carry no value of their own.",
    },
    {
      invariantKind: "absence",
      statement: "Which flags one act needs is judged by that act rather than here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or the index.",
    },
  ],
} as const satisfies Module
