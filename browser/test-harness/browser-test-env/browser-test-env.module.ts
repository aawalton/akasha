import type { Module } from "@akasha/code/module"

export const browserTestEnv = {
  id: "01a05ca9-d802-7492-b412-add2b3935750",
  pageTypeSlug: "module",
  type: "module",
  slug: "browser-test-env",
  definition: "the credentials and urls a browser test signs in with, read from the environment",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An environment missing a name yields no environment rather than a partial environment.",
    },
  ],
} as const satisfies Module
