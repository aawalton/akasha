import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiMendingWeave = {
  id: "01a0f21c-00fa-7787-8ca3-3ea851b86307",
  type: "page-type/lore",
  slug: "overwhere-iii-mending-weave",
  title: "Mending Weave",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "world-skill/overwhere-iii-mending-weave",
  facts: [
    {
      fact: "Her first mending with a holy thread earns Mending Weave: [New skill acquired – Mending Weave.]",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "[Mending Weave – At [Basic] level, stitch holy current into a wound to close it slowly.]",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "At Basic, one Mending Weave gives back about 5 health and closes one small wound.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Her first Mending Weave took near half an hour of restitching a slipping thread before it held.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "A second Mending Weave over a puckered seam within two days smooths it to a clean, flat line.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iii-nala",
        "character-other/overwhere-iii-hild-wendle",
      ],
    },
    {
      fact: "An old, years-set scar takes three Mending Weaves to smooth; each flattens and pales it a little.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "Each Mending Weave laid on a scar counts as a use of the skill.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Watching the currents as she rests, a Legend Mana Weaver may see how a mending would ride them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Mending Weave braided onto a lent current runs deeper: an old scar smooths in two weaves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Mending Weave works on her own body as on anyone's; laid on her own burn, it closes it the same.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iii-nala",
        "character-other/overwhere-iii-marda-hesk",
      ],
    },
    {
      fact: "A shallow burn like a current scald is a small wound; one Mending Weave closes it.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iii-nala",
        "character-other/overwhere-iii-marda-hesk",
      ],
    },
    {
      fact: "Her fifth telling use past Basic shows: [Mending Weave has advanced: Basic → Novice]",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
