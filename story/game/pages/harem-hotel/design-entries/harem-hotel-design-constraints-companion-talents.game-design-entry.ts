import type { GameDesignEntry } from "akasha/story/game/design-entry/game-design-entry.page-type.types.ts"

export const haremHotelDesignConstraintsCompanionTalents = {
  id: "01a0c946-5aaf-733b-b0d1-42905d303d8a",
  type: "page-type/game-design-entry",
  slug: "harem-hotel-design-constraints-companion-talents",
  title: "Companion Talents",
  game: "game/harem-hotel",
  kind: "world-logic",
  source:
    "partners-ii gmReference 'Talents and Bonds in the World' + Alan rulings 2026-07-13 (~/agents/awen/memory/companion-talent-design-constraints.md)",
  note: "md",
} as const satisfies GameDesignEntry
