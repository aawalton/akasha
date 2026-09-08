import type { Module } from "@akasha/code/module"

export const commandStopping = {
  id: "01a08210-6d0b-7dc1-ab3e-7bbc1658cd31",
  pageTypeSlug: "module",
  slug: "command-stopping",
  definition: "a call stopped where the command runs past the seconds that command is allowed",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The seconds a command is allowed are read off that command's own page.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating no seconds is allowed thirty.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating seconds that are no number above nothing is allowed thirty.",
    },
    {
      invariantKind: "departure",
      statement: "A command answering without a promise runs past nothing.",
    },
    {
      invariantKind: "departure",
      statement: "What is said names the call and the seconds that call was allowed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here ends the work a stopped call left running.",
    },
    {
      invariantKind: "departure",
      statement: "The process exiting is what ends that work.",
    },
  ],
} as const satisfies Module
