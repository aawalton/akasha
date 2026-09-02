import type { Module } from "../../code-system/modules/module.page-type.ts"

export const sshReach = {
  id: "01a05c2f-0f03-7c3a-84db-8888d5bebc83",
  pageTypeSlug: "module",
  slug: "ssh-reach",
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
    {
      invariantKind: "departure",
      statement: "A reader letting go before the output ends kills the command.",
    },
  ],
} as const satisfies Module
