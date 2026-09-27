import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const theDatingGameCloseness = {
  id: "01a0e332-d353-747c-865b-d795f6e51f89",
  type: "page-type/world-mechanic",
  slug: "the-dating-game-closeness",
  title: "Closeness",
  description:
    "Every turn with a girl present stays inside the closeness level her relationship has reached, in the beats and in the prose. Before the game master writes the beats or the writer writes the prose of such a turn, each reads her relationship page at `story/world/pages/personas/stories/played/the-dating-game/mechanics/relationships/the-dating-game-<persona>.world-relationship.ts`. Her rung is the relationship's computed level where the page shows one; otherwise it is the highest `persona/closeness-level/pages/level-N.closeness-level.ts` whose `pointsToHere` her `relationshipPoints` reach, and short of level 1 she has no rung. Each then reads that level page and keeps the turn within its definition and conduct, which bound what she shares, how she touches him, where the two of them are and how intimate the turn gets. Wardrobe and pose are for her pictures, and bind no turn. Below level 1 she is someone he has only just met; level 5 is intimacy implied rather than shown; level 6 is explicit sex; level 7 is group sex, where she brings others into the bed. Where he reaches past her rung, she answers as she would at that rung.",
} as const satisfies WorldMechanic
