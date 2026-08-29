import type { Module } from "../../code-system/module/module.page-type.ts"

export const hookPayload = {
  id: "01a04f4d-f0ea-791d-8bb4-ce41b59e46b1",
  pageTypeSlug: "module",
  slug: "hook-payload",
  definition: "a hook payload as the agent sends one, made so a test can hand it to a hook",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The payload is built to the shape the agent sends, so a hook spawned in a test is fed what it is fed when it runs for real.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where the call was made is carried, because a hook may refuse on it, and one that does not is handed it anyway rather than being fed a different shape.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing in the running system makes a payload. The agent sends it, the hooks read it, and this stands so a test can send one too.",
    },
  ],
} as const satisfies Module
