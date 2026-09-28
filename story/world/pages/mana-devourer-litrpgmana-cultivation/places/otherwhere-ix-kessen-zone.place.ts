import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxKessenZone = {
  id: "01a0ea3e-eaaf-7dd9-a169-944d1eb033d2",
  type: "page-type/place",
  slug: "otherwhere-ix-kessen-zone",
  title: "The Kessen Zone",
  world: "world/mana-devourer-litrpgmana-cultivation",
  within: "place/otherwhere-ix-entrerea",
  facts: [
    {
      fact: "The Kessen Zone is an E Grade zone on the continent of Entrerea.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Kessen Zone is held by Halvard, God of Diligence, through the Orrow Trading House.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Kessen Zone lies about forty days west of Materia and Sun City by road and barrier gate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Zeppelins almost never come to the Kessen Zone; news from the east arrives weeks old.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A yellow barrier bounds the zone's west, a day and a half west of the Flats' heart.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The yellow barrier is a wall of light from ground to sky; roads pass it only at gates.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Orrow wardens keep the barrier gates and take a toll and a name from all who pass.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The zone's west is the Glassgrass Flats; its east is farmland and low hills round Kessenhold.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Brass Road runs east to west across the zone, from the barrier gate to Kessenhold.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kessen folk speak Common; bengai bands of the Flats also keep their own tongue.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Kessen Zone's peoples are mostly humans, with boar-men, lizardmen and some bengai.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kessen folk are wary, practical and hard-working; idle hands are counted a sin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In the Kessen Zone a person without papers or kin may be taken as unclaimed.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
