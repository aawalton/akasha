import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const emailCommandHelp = {
  id: "01a065a1-0caf-7000-9d20-1632cb9401b2",
  pageTypeSlug: "module",
  slug: "email-command-help",
  definition: "the flags and environment variables an email command declares to its help",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A flag every composing command takes is declared here once.",
    },
    {
      invariantKind: "departure",
      statement: "The three Gmail environment variables are all required.",
    },
    {
      invariantKind: "departure",
      statement: "A flag taking an address accepts a comma-separated list as well as a repeat.",
    },
  ],
} as const satisfies Module
