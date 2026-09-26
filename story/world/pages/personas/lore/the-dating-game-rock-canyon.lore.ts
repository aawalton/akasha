import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameRockCanyon = {
  id: "01a0de94-e378-732c-9153-0ff025b97f18",
  type: "page-type/lore",
  slug: "the-dating-game-rock-canyon",
  title: "Rock Canyon",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  facts: [
    "Alan walks uphill from Apple Ave to Rock Canyon; lawns give way to scrub oak near the bench.",
    "The sidewalk ends at Rock Canyon Park, a grass bowl under the mountain.",
    "The gravel trail into Rock Canyon starts past the park's grass bowl.",
    "The canyon closes within minutes between walls of grey quartzite tipped on end.",
    "In late September the creek runs low under willows.",
    "In late September the side-draw maples are red and the oak is starting to bronze.",
    "The canyon shade is cold and the trail dust is pale.",
    "Climbers rope up on the first climbing walls early on Saturday mornings.",
    "A shout at the walls echoes off the far wall and again, fainter, from upstream.",
    "Around the bend past the first walls, a car-sized boulder sits beside the trail near the creek.",
  ],
} as const satisfies Lore
