import type { Module } from "@akasha/code-system/module"

export const domainDocuments = {
  id: "01a06949-b281-722e-a64e-145445dae3b2",
  pageTypeSlug: "module",
  slug: "domain-documents",
  definition: "reading domains, their parents and their champions out of markdown frontmatter",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A slug is taken by whichever document reaches it first.",
    },
    {
      invariantKind: "departure",
      statement: "A slug taken twice over is reported with every document that took it.",
    },
    {
      invariantKind: "departure",
      statement: "A document is found by its bare slug or by its page type with that slug.",
    },
    {
      invariantKind: "departure",
      statement: "A domain's parents are followed until no new domain appears.",
    },
    {
      invariantKind: "departure",
      statement: "A champion is placed only on a domain document that its own slug names.",
    },
    {
      invariantKind: "departure",
      statement: "A search for a champion follows the first parent of each document.",
    },
  ],
} as const satisfies Module
