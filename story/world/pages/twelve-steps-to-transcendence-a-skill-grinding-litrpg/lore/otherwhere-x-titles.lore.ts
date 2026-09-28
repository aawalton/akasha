import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXTitles = {
  id: "01a0ea75-6dc4-70f2-985b-15bd0ff8164f",
  type: "page-type/lore",
  slug: "otherwhere-x-titles",
  title: "Titles",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-mechanic/otherwhere-x-titles",
  facts: [
    {
      fact: "Titles show on status under the name, and in their own Titles section.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Titles have no level; they are passive, permanent enhancements.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Each title grants its own passive ability or effect.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Titles seem rare; few monsters carry them and teachers do not expect early titles.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Killing a titled monster steals its title for the killer.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Notice: "[Tier 2 Shadow Monkey slain. Essence gained. Title usurped.]"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The System puts a title's details straight into the holder's mind.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A person's first title is equipped automatically; what equipping does is unclear.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A title's effect works even when it is not equipped.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Non-Unique titles show a counter out of 100 that rises by acting in the title's theme.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Unique titles, like [Hunter], have no counter.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Status lists titles like "- [Hunter] - Equipped" and "- [Lurker] (13/100)".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some teachers explain the System without ever mentioning titles.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
