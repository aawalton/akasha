import type { Module } from "../../code-system/modules/module.page-type.ts"

export const agentForestAnswer = {
  id: "01a0686b-bfe9-7a04-b438-fbda74d64739",
  pageTypeSlug: "module",
  slug: "agent-forest-answer",
  definition: "the seats, the pages and the repository the agent-forest command answers with",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "An answer carrying no rows array is refused as naming no seat at all.",
    },
    {
      invariantKind: "constraint",
      statement: "A row carrying no id is refused, because a row with none is no seat.",
    },
    {
      invariantKind: "constraint",
      statement: "A row whose liveness is no boolean is refused.",
    },
    {
      invariantKind: "constraint",
      statement: "A field that is neither a string nor null is refused by name.",
    },
    {
      invariantKind: "departure",
      statement: "A row's color is read from `color` or from `colour`, whichever it carries.",
    },
    {
      invariantKind: "departure",
      statement: "A row names where its page sits inside the repository the answer names.",
    },
    {
      invariantKind: "departure",
      statement: "A row holding no page carries null rather than a path composed here.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent page is keyed by the seat that ran it and the id it runs under.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent page missing its seat, its id or its path is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "An answer naming no repository carries no subagent page.",
    },
    {
      invariantKind: "departure",
      statement: "A turn color is read from `colors` or from `colours`, whichever is carried.",
    },
    {
      invariantKind: "constraint",
      statement: "A state the answer names no color for is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which subagents are running.",
    },
  ],
} as const satisfies Module
