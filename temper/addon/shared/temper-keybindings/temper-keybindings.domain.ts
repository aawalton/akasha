import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperKeybindings = {
  id: "01a18478-1f8b-7ef3-9702-ee7c4d84954c",
  type: "page-type/domain",
  slug: "temper-keybindings",
  definition: "Alan's keybindings for the game and its add-ons",
  parts: ["page-type/temper-keybinding"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages hold Alan's keybindings, and the game takes them from the pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key Alan rebinds in the game is landed back onto its page.",
    },
  ],
  createdAt: "2026-10-28T21:43:47.335Z",
  updatedAt: "2026-10-28T21:43:47.335Z",
} as const satisfies Domain
