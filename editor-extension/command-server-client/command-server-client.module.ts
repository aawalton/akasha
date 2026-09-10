import type { Module } from "../../code-system/modules/module.page-type.types.ts"

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
      statement: "An ask names a module under `module:` and an export under `export:`.",
    },
    {
      invariantKind: "constraint",
      statement: "An ask missing either key is thrown away by the server without a refusal.",
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
      statement: "An ask a server ran nothing for is asked once more on a fresh server.",
    },
    {
      invariantKind: "departure",
      statement:
        "A lease and a gone server and a server that never started say a server ran nothing.",
    },
    {
      invariantKind: "constraint",
      statement: "Asking again would run a second time the command a server had already run.",
    },
    {
      invariantKind: "departure",
      statement: "The pipe answers come back on is listened to for its end.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing but this client closes the pipe answers come back on.",
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
        "A server's exit refuses no ask before every answer that server already said has been taken.",
    },
    {
      invariantKind: "departure",
      statement: "A server's exit refuses every ask still waiting.",
    },
    {
      invariantKind: "departure",
      statement: "A server that says no hello is refused with the bytes that server wrote instead.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal waits for the server's streams to close.",
    },
    {
      invariantKind: "departure",
      statement: "The last four thousand characters a server wrote are kept.",
    },
  ],
} as const satisfies Module
