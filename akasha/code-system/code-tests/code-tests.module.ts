import type { Module } from "../module/module.page-type.ts"

export const codeTests = {
  id: "01a04eb6-9e5f-7000-9bb8-11bc82309d76",
  pageTypeSlug: "module",
  slug: "code-tests",
  definition:
    "standing a change up as a tree of its own, running the tests in it, and reading what the run said",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A run is answered as what it exited and what it printed and the summary read out of it and the verdict that follows.",
    },
    {
      invariantKind: "departure",
      statement: "Every caller reads one answer rather than repeating how it is read.",
    },
    {
      invariantKind: "departure",
      statement: "A run marks the child it spawns.",
    },
    {
      invariantKind: "departure",
      statement:
        "A test reaching for this can tell it already stands inside a run and stops rather than starting another.",
    },
    {
      invariantKind: "departure",
      statement: "A run printing no summary is a crash whatever it exited.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run reaching fewer files than stand under what was named is short rather than a pass.",
    },
    {
      invariantKind: "departure",
      statement: "Colour is taken out before the summary is read.",
    },
    {
      invariantKind: "departure",
      statement:
        "The test standing beside a file is named by the same rule that names any file beside a page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A world is written out of bodies handed in rather than read off the working tree.",
    },
    {
      invariantKind: "departure",
      statement:
        "A world borrows from the tree it is made from only the index and what a run is configured by and a link to the modules imported.",
    },
    {
      invariantKind: "departure",
      statement: "What is borrowed is skipped where it is not there.",
    },
    {
      invariantKind: "departure",
      statement: "A world is held under `/var/tmp` rather than `/tmp`.",
    },
    {
      invariantKind: "departure",
      statement: "`/tmp` is memory this machine shares.",
    },
    {
      invariantKind: "departure",
      statement: "A tree left there is taken out of it.",
    },
    {
      invariantKind: "departure",
      statement: "A world is swept by whoever asked for it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which tests inside a file run.",
    },
    {
      invariantKind: "absence",
      statement: "A run is named by path.",
    },
    {
      invariantKind: "absence",
      statement: "The runner chooses the rest.",
    },
    {
      invariantKind: "absence",
      statement: "How a run is reported is not answered here.",
    },
    {
      invariantKind: "absence",
      statement:
        "What is printed and how much of it a caller may hold and what a refusal says belong to whoever asked for the run.",
    },
    {
      invariantKind: "absence",
      statement: "Which paths a world is written over is not answered here.",
    },
    {
      invariantKind: "absence",
      statement: "A caller hands in the paths and the bodies.",
    },
    {
      invariantKind: "absence",
      statement: "A world is only what is made of them.",
    },
  ],
} as const satisfies Module
