import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theDatingGameProvoRiverTrail = {
  id: "01a0e838-d664-7128-a489-855e34041fb2",
  type: "page-type/place",
  slug: "the-dating-game-provo-river-trail",
  title: "The Provo River Trail",
  world: "world/personas",
  facts: [
    {
      fact: "The paved Provo River Trail follows the river from Utah Lake up into Provo Canyon.",
      knowers: ["lore-disclosure/game-master", "character-other/the-dating-game-aelwyn"],
    },
    {
      fact: "At the mouth of Provo Canyon the river trail runs under cottonwoods beside the fast river.",
      knowers: ["lore-disclosure/game-master", "character-other/the-dating-game-aelwyn"],
    },
    {
      fact: "Where the river leaves the canyon, runners and cyclists share the trail most evenings.",
      knowers: ["lore-disclosure/game-master", "character-other/the-dating-game-aelwyn"],
    },
  ],
} as const satisfies Place
