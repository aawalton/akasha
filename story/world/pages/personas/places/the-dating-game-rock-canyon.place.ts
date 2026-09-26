import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theDatingGameRockCanyon = {
  id: "01a0dec2-d48d-7f14-9ef6-310501b85b8d",
  type: "page-type/place",
  slug: "the-dating-game-rock-canyon",
  title: "Rock Canyon",
  world: "world/personas",
  facts: [
    {
      fact: "Alan walks uphill from Apple Ave to Rock Canyon; lawns give way to scrub oak near the bench.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "The sidewalk ends at Rock Canyon Park, a grass bowl under the mountain.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "The gravel trail into Rock Canyon starts past the park's grass bowl.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "The canyon closes within minutes between walls of grey quartzite tipped on end.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "In late September the creek runs low under willows.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "In late September the side-draw maples are red and the oak is starting to bronze.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "The canyon shade is cold and the trail dust is pale.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "Climbers rope up on the first climbing walls early on Saturday mornings.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "A shout at the walls echoes off the far wall and again, fainter, from upstream.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "Around the bend past the first walls, a car-sized boulder sits beside the trail near the creek.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
  ],
} as const satisfies Place
