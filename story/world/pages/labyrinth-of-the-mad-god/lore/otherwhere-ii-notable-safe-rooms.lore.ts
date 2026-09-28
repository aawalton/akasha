import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiNotableSafeRooms = {
  id: "01a0e9bb-b06d-7282-90fd-0c8dc2678956",
  type: "page-type/lore",
  slug: "otherwhere-ii-notable-safe-rooms",
  title: "Safe Rooms of Note",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "A communal safe room at the tower lets all of Team Earth meet and plan between stages.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The luxury safe room after the arena is a penthouse suite with a view.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A 24-hour safe room is a thirty-foot concrete cube with cots, a shower and training mats.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A voucher can turn a safe room's door into an entrance to a craft world.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Conduits hold temporary safe rooms marked by a painted archway reading Saferoom.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
