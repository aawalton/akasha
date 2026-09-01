import type { Module } from "../../code-system/module/module.page-type.ts"

export const sshStreaming = {
  id: "01a05c14-b119-7002-a27f-22b1d64f4766",
  pageTypeSlug: "module",
  slug: "ssh-streaming",
  definition: "a script run on another host, its output taken line by line or whole",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The script is handed over standard input rather than written into the command.",
    },
    {
      invariantKind: "departure",
      statement: "A host key is not checked.",
    },
    {
      invariantKind: "departure",
      statement: "An exit that is not zero is an operational error rather than a thrown fault.",
    },
  ],
} as const satisfies Module
