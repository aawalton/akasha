import type { Module } from "../../code-system/modules/module.page-type.ts"

export const commandServerClient = {
  id: "01a064ea-f958-7000-98c8-4e49f2868f5f",
  pageTypeSlug: "module",
  type: "module",
  slug: "command-server-client",
  definition: "the ask written to a held-open bun process and the answer or refusal the ask meets",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Asks arriving during a start wait on that start rather than spawning a server apiece.",
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
      statement: "An ask with no `verb:` key is thrown away by the server without a refusal.",
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
      statement:
        "The pipe answers come back on is listened to for its end, so nothing else closes it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here has an answer.",
    },
    {
      invariantKind: "absence",
      statement: "Two servings share no session.",
    },
    {
      invariantKind: "departure",
      statement:
        "A server's exit refuses no ask before what the server already said has been taken.",
    },
    {
      invariantKind: "departure",
      statement: "The pipe ending is what refuses an ask a gone server left waiting.",
    },
  ],
} as const satisfies Module
