import type { Module } from "../code-system/module/module.page-type.ts"

export const gitCalls = {
  id: "01a04e16-d380-7000-aca5-c084a6730236",
  pageTypeSlug: "module",
  slug: "git-calls",
  definition: "the git invocations a shell command line carries",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command line is cut into segments before any word in it is read as a call.",
    },
    {
      invariantKind: "departure",
      statement: "A quoted run is taken out before the cut, so a payload is never read as a call.",
    },
    {
      invariantKind: "departure",
      statement: "The word that runs a call is matched by its basename, so a path to git is git.",
    },
    {
      invariantKind: "departure",
      statement: "A prefix that sets a call up is stepped over, and the call behind it is read.",
    },
    {
      invariantKind: "departure",
      statement: "A global flag that takes a value takes the word after it, which is no verb.",
    },
    {
      invariantKind: "departure",
      statement: "A command carrying no verb is no call here.",
    },
    {
      invariantKind: "absence",
      statement: "A verb is read here, never judged.",
    },
    {
      invariantKind: "constraint",
      statement: "This reads a shell command line without being a shell.",
    },
    {
      invariantKind: "gap",
      statement: "A hook reads a git verb out of a command line without writing a shell parser.",
    },
  ],
} as const satisfies Module
