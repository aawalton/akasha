import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersEventsWorld = {
  id: "01a0632d-cc07-702c-b838-1700356d3d00",
  type: "page-type/module",
  slug: "characters-events-world",
  definition: "what this add-on does when the played character's progress in the world changes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A finished quest counts as a daily writ only where its type is crafting.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The inventory check is taken again each time the items add-on finds new actions.",
    },
  ],
  createdAt: "2026-09-02T17:32:20.871Z",
  updatedAt: "2026-09-26T18:07:26.000Z",
} as const satisfies Module
