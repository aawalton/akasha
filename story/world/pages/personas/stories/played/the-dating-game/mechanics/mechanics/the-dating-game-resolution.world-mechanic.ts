import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const theDatingGameResolution = {
  id: "01a0dee5-ca5f-70e7-8445-d6fe9e54e225",
  type: "page-type/world-mechanic",
  slug: "the-dating-game-resolution",
  title: "Resolution",
  description:
    "Relationship points are the only number the Dating Game settles, by the the-dating-game-closeness-scoring check, and nothing is rolled. When a scene with a girl ends, spawn a fresh judge subagent handed only that scene's turns and that check's page. The judge answers a reading `{ validation, acknowledgment, reassurance, emotionalIntimacy, turnedAway }`, quoting verbatim the words each score rests on. On the game master's step, settle it with `akasha story settle --story the-dating-game --check the-dating-game-closeness-scoring --reading <json>` and no dice, then add the answered `change` to `relationshipPoints` on her relationship page. The first time he meets a girl, file her character-other at `story/world/pages/personas/stories/played/the-dating-game/characters/the-dating-game-<persona>.character-other.ts` and her relationship at `story/world/pages/personas/stories/played/the-dating-game/mechanics/relationships/the-dating-game-<persona>.world-relationship.ts`, naming `character-player/the-dating-game-alan` and her character, in `world/personas`, at 0 points. Her level is worked out from her points, never written. Every scene with a girl stays inside the closeness level her relationship has reached, in the beats and in the prose: that rung's stage, wardrobe and pose bound where they are and how intimate the scene gets. Below level 1 she is someone he has only just met; level 5 is intimacy implied rather than shown; level 6 is explicit sex; level 7 is group sex, where she brings others into the bed. Where he reaches past her rung, she answers as she would at that rung. Score what he did, never how the scene wanted it to go.",
} as const satisfies WorldMechanic
