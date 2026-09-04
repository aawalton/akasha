import type { Domain } from "@akasha/domains/domain"

export const ring = {
  id: "01a0655b-9cdd-73ae-8a72-25ca95f9932b",
  pageTypeSlug: "domain",
  slug: "ring",
  definition: "a reading drawn as an arc around the figure it reads",
  partSlugs: ["domain/budget-ring", "domain/completion-ring", "domain/stoplight-ring"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A ring is one of two sizes.",
    },
    {
      invariantKind: "departure",
      statement: "The small ring is the size three of them span a small tile at.",
    },
    {
      invariantKind: "departure",
      statement: "The large ring fills a small tile alone.",
    },
    {
      invariantKind: "departure",
      statement: "Every arc starts at twelve o'clock and sweeps clockwise.",
    },
    {
      invariantKind: "departure",
      statement: "The figure stands inside the ring and the label below it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A ring leaves slack above its label rather than taking every point the label does not.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a ring draws in place of itself is drawn at the size the ring draws rather than is given.",
    },
  ],
} as const satisfies Domain
