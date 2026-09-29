import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXAssessmentTablet = {
  id: "01a0ea77-7cd0-76e0-9157-4b9422c92fbc",
  type: "page-type/lore",
  slug: "otherwhere-x-assessment-tablet",
  title: "Assessment Tablet",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-item/otherwhere-x-assessment-tablet",
  facts: [
    {
      fact: "An assessment tablet is a rectangular slab of glass; the subject lays a palm on it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'It prompts: "Status readout requested by external device. Grant permission?"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The subject grants permission by mentally choosing yes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "On acceptance the tablet turns cold and projects the status as a blue hologram.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is the usual way to see a Tier 0's status, which they cannot see themselves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Older tablet models exist and still work.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Using one is expensive; an army camp will not spend the funds on a Tier 0 child.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Remote frontier villages have no access to assessment tablets.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A readout reveals a skinwalker skill, so soldiers use tablets to screen suspects.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A lone calm survivor of a disaster may be suspected of being a skinwalker.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Soldiers cuff suspected skinwalkers and threaten beheading if they refuse assessment.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
