import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedPolishWorldWomb = {
  id: "01a18e17-127d-7846-93d8-b7c1cdbb3b14",
  type: "page-type/place",
  slug: "gifted-polish-world-womb",
  title: "The Womb",
  world: "world/gifted-polish-world",
  within: "place/gifted-polish-world-cult-hideout",
  depth: 0,
  exits: [
    { to: "place/gifted-polish-world-cult-birthing-room", way: "Birth, some five months on." },
  ],
  facts: [
    {
      fact: "The womb is warm, wet and wholly dark, and a heartbeat thumps through it day and night.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The unborn body in it is about four months grown, humanoid, small and barely able to move.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Through the walls come muffled voices, the mother's humming, and far-off chanting.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The mother is a member of the demon cult and carries the child for its summoning.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Near ten on her first night, cult women gather round the mother and chant over her belly.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nala hears the chant muffled through the walls, many women's voices, in words she does not know.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Each morning the cult leaders talk beside her mother, and their muffled words reach Nala.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The cult speaks Helenian, and the leaders talk low and quick among themselves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Through the walls, voices come as blurred hums; their rise and fall carry, few sounds do.",
      knowers: ["lore-disclosure/game-master", "character-player/gifted-polish-nala"],
    },
    {
      fact: "A word said often, loud and close to the mother comes through as a clear sound, not a meaning.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Beyond the walls: two or three deep voices, and a woman's close above that hums between words.",
      knowers: ["lore-disclosure/game-master", "character-player/gifted-polish-nala"],
    },
    {
      fact: "The talk beyond the walls has a rhythm wrong for English, its stresses landing in odd places.",
      knowers: ["lore-disclosure/game-master", "character-player/gifted-polish-nala"],
    },
    {
      fact: "At her kick, the humming woman gasped and the talk beyond the walls stopped dead.",
      knowers: ["lore-disclosure/game-master", "character-player/gifted-polish-nala"],
    },
    {
      fact: "After her kick, a hand pressed flat over her from outside, then a second, heavier one.",
      knowers: ["lore-disclosure/game-master", "character-player/gifted-polish-nala"],
    },
    {
      fact: "A deep voice spoke close to the wall, low and slow, the same few sounds over and over.",
      knowers: ["lore-disclosure/game-master", "character-player/gifted-polish-nala"],
    },
    {
      fact: "The deep voice is a cult leader's, and he took the kick for the demon in the child stirring.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He repeats three sounds over the belly, 'Sa-vo-reth', the cult's name for the demon it called.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Said so often, slow and close, 'Sa-vo-reth' comes through the walls clear enough to hold.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The deep voice repeats one short run of sounds, slow and close, with a breath between each time.",
      knowers: ["lore-disclosure/game-master", "character-player/gifted-polish-nala"],
    },
    {
      fact: "The deep voice stopped; the heavier hand pressed once more, then both hands lifted away.",
      knowers: ["lore-disclosure/game-master", "character-player/gifted-polish-nala"],
    },
    {
      fact: "The deep voices moved off talking low, a door thudded, and the woman above began to hum.",
      knowers: ["lore-disclosure/game-master", "character-player/gifted-polish-nala"],
    },
  ],
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T19:08:54.886Z",
} as const satisfies Place
