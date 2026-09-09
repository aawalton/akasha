import type { Module } from "@akasha/code/module"

export const seatPresenceRead = {
  id: "01a06949-b281-7a43-b380-0b524b851f09",
  pageTypeSlug: "module",
  type: "module",
  slug: "seat-presence-read",
  definition: "whether an agent is present in its seat, answered from akasha's index of seats",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An agent akasha has no seat page for is absent.",
    },
    {
      invariantKind: "departure",
      statement: "An agent whose seat names no readable process reads as unknown.",
    },
    {
      invariantKind: "departure",
      statement: "An agent is present only where the process its seat names is still live.",
    },
    {
      invariantKind: "departure",
      statement: "The agents akasha has a seat for are listed in sorted order.",
    },
    {
      invariantKind: "departure",
      statement: "The seat a pid has is found by matching the pid in each seat's process key.",
    },
    {
      invariantKind: "departure",
      statement: "Frontmatter that will not parse as a mapping reads as nothing.",
    },
  ],
} as const satisfies Module
