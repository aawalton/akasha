import type { Module } from "@akasha/code-system/module"

export const checkPerturbing = {
  id: "01a05e07-1490-79c8-a302-f5b20cde772f",
  pageTypeSlug: "module",
  slug: "check-perturbing",
  definition: "the bodies a change carries, and the bodies contradicting it, written to a tree",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change is proposed as the bodies it leaves at the paths it carries.",
    },
    {
      invariantKind: "departure",
      statement: "A path the change does not carry is read off the scratch tree.",
    },
    {
      invariantKind: "departure",
      statement: "What answers before a change and what answers after it are two readers.",
    },
    {
      invariantKind: "departure",
      statement: "A contradicting body is written at every path the change carries and no other.",
    },
    {
      invariantKind: "departure",
      statement: "A contradicting body is one no change here describes.",
    },
    {
      invariantKind: "departure",
      statement: "A contradicting body is shaped by the naming of the path it is written at.",
    },
    {
      invariantKind: "departure",
      statement: "A path the change takes away holds a contradicting body rather than nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A scenario names the kind of change it is.",
    },
    {
      invariantKind: "departure",
      statement: "A kind reaching no path in the tree yields no scenario.",
    },
    {
      invariantKind: "departure",
      statement: "A scenario may carry more than one path.",
    },
    {
      invariantKind: "departure",
      statement: "One scenario carries a manifest together with a body the package it names holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "One scenario carries a body a manifest names together with a test in another package reaching it.",
    },
    {
      invariantKind: "departure",
      statement: "Which test reaches a body across a package edge is read from the index.",
    },
    {
      invariantKind: "absence",
      statement: "No scenario here is judged.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here makes a scratch tree or sweeps one.",
    },
  ],
} as const satisfies Module
