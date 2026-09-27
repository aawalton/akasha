import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const theDatingGameResolution = {
  id: "01a0dee5-ca5f-70e7-8445-d6fe9e54e225",
  type: "page-type/world-mechanic",
  slug: "the-dating-game-resolution",
  title: "Resolution",
  description:
    "Relationship points are the only number the Dating Game settles, by the the-dating-game-closeness-scoring check, and nothing is rolled. The mechanics story recorder, never the game master, scores every turn with a girl present; a turn with no girl scores nothing. It judges that turn alone on what Alan did in it, answering for each girl present a reading `{ character, validation, acknowledgment, reassurance, emotionalIntimacy, turnedAway, quotes }`: `character` is her character-other, and `quotes` holds, keyed by score, the prose's words each score above nought and each missed bid rests on, verbatim. It drafts `akasha story settle --story the-dating-game --turn <the turn> --check the-dating-game-closeness-scoring --reading <json> --draft`, keeping the reading and its answer in the turn's outcomes, then drafts adding the answered `change` to `relationshipPoints` on her relationship page. The first time he meets a girl, file her character-other at `story/world/pages/personas/stories/played/the-dating-game/characters/the-dating-game-<persona>.character-other.ts`, with her persona's `cover`, and her relationship at `story/world/pages/personas/stories/played/the-dating-game/mechanics/relationships/the-dating-game-<persona>.world-relationship.ts`, naming `character-player/the-dating-game-alan` and her character, in `world/personas`, at 0 points. Her level is worked out from her points, never written, and the-dating-game-closeness keeps every turn with her inside it. Score what he did, never how the scene wanted it to go.",
} as const satisfies WorldMechanic
