import type { Module } from "../../code-system/modules/module.page-type.ts"

export const agentPageOpening = {
  id: "01a0686b-bfe9-782e-86e6-c23e6ef21f33",
  pageTypeSlug: "module",
  slug: "agent-page-opening",
  definition: "the page akasha holds for a row, opened from the row that already carried its path",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The command is offered on every row and refuses the rows holding no page.",
    },
    {
      invariantKind: "departure",
      statement: "A row holding no page is told about rather than passed over silently.",
    },
    {
      invariantKind: "departure",
      statement: "A path is taken off the row rather than composed from anything here.",
    },
    {
      invariantKind: "departure",
      statement: "A page opens as a preview rather than as a pinned editor.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here composes a path for a row that carries none.",
    },
  ],
} as const satisfies Module
