import type { Module } from "../../code-system/modules/module.page-type.ts"

export const commandServerClient = {
  id: "01a064ea-f958-7000-98c8-4e49f2868f5f",
  pageTypeSlug: "module",
  slug: "command-server-client",
  definition: "the ask written to a held-open bun process and the answer or refusal the ask meets",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Asks arriving during a start wait on that start rather than each spawning a server.",
    },
    {
      invariantKind: "departure",
      statement: "Every answer comes back on the fourth pipe rather than on stdout or stderr.",
    },
    {
      invariantKind: "constraint",
      statement:
        "An ask names its command under the key `verb:` rather than under a shorthand for `command`.",
    },
    {
      invariantKind: "constraint",
      statement: "An ask carrying no `verb:` key is thrown away by the server without a refusal.",
    },
    {
      invariantKind: "departure",
      statement: "An answer naming no age is treated as older than any bound.",
    },
    {
      invariantKind: "departure",
      statement:
        "A caller naming a lease bound replaces the server's number here rather than tightening it.",
    },
    {
      invariantKind: "departure",
      statement:
        "An answer older than the bound is refused here though the server let the answer through.",
    },
    {
      invariantKind: "departure",
      statement:
        "A server that has not answered within the timeout is killed rather than asked again.",
    },
    {
      invariantKind: "departure",
      statement: "Every ask waiting on a lost server is refused rather than left waiting.",
    },
    {
      invariantKind: "departure",
      statement:
        "An ask refused for a lease or for a gone server is asked once more on a fresh server.",
    },
    {
      invariantKind: "departure",
      statement: "An ask refused as over-lease is not asked again.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here holds an answer.",
    },
    {
      invariantKind: "absence",
      statement: "Two servings share no session.",
    },
  ],
} as const satisfies Module
