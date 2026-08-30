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
      statement: "The payload is built to the shape the agent sends.",
    },
    {
      invariantKind: "departure",
      statement: "Where the call was made is carried.",
    },
    {
      invariantKind: "departure",
      statement:
        "A hook that does not refuse on where the call was made is handed it anyway rather than being fed a different shape.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing in the running system makes a payload.",
    },
  ],
} as const satisfies Module
