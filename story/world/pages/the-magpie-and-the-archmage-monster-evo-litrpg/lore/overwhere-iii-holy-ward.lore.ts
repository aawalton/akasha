import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiHolyWard = {
  id: "01a101c8-12ce-7859-82af-d2f4f5037b78",
  type: "page-type/lore",
  slug: "overwhere-iii-holy-ward",
  title: "Holy Ward",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "world-skill/overwhere-iii-holy-ward",
  facts: [
    {
      fact: "Practicing at the shrine, the first new shape white-gold takes for her is a close ward.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "Finding a new weave in an afternoon's practice is a standard action check.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Holy Ward lies over her skin as a faint white-gold shimmer.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "A Holy Ward costs 3 mana, or is fed free from white-gold current near the shrine.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Holy Ward holds about ten minutes, or until she lets it go.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Holy Ward wards 2, as hide does; at Adept it wards 3, at Expert 4.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A blighted bite or claw lays no blight through a Holy Ward.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Her first Holy Ward that holds earns: [New skill acquired – Holy Ward.]",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "[Holy Ward – At [Basic] level, weave white-gold close over yourself to turn blows and blight.]",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
  ],
} as const satisfies Lore
