import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVStatus = {
  id: "01a0e9f2-c28a-78e7-9ef1-4138eaf3cb30",
  type: "page-type/lore",
  slug: "otherwhere-v-status",
  title: "Status",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-status",
  facts: [
    {
      fact: "A status box lists one entry per line, each line its own paragraph.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A newcomer\'s first status, line 1: "Status of <full name>"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'First status, line 2: "Talent 1: Pending" (or "Talent 1: None" if nothing is offered)',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'First status, line 3: "Talent 2: None"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'First status, line 4: "Talent 3: None"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'First status, line 5: "Class: None, level 1"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'First status, line 6: "Utility skills: None"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A status has three Talent slots, numbered Talent 1, Talent 2 and Talent 3.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A pending offer shows beneath the status as "Pending Talent: <tier> <Name>", then a description.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'An accepted Talent shows as "Permanent Talent 1: <Name> <rank>".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Example accepted Talent line: "Permanent Talent 1: High-Tier Magic Resistance 3"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'One who has reached level 9 but not chosen a class shows "Class: None, level 9+".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'With a class, the class line reads "Class: <class name> level <N>".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Under the class line comes its resource as current over maximum, e.g. "Stamina: 250/250".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Class skills follow the resource line, one per line, with no rank numbers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Last comes "Utility skills:", then each utility skill as "<tier> <Name> <rank>".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some utility skill lines carry a tier prefix such as Low-tier, Mid-tier or High-tier; others none.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "One holding two classes shows each class line with its own resource line and class skills.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The early status with a class, in order, is the lines below (a first-week example).",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"Permanent Talent 1: High-Tier Magic Resistance 10" / "Talent 2: None" / "Talent 3: None"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"Class: Antimagic Brawler level 15" / "Stamina: 250/250"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"Brawler\'s Indifference" / "Antimagic Blows"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"Utility skills:" / "Low-tier Focused Mind 5" / "Low-tier Earnestness 3"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In a status box, Talents come first, then each class, then utility skills.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Questors can read another person's status and build with inspection skills.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A mental protection skill fed with Focus can block another's reading of one's status.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A status read can be felt by its target as a tingle or scratch on a mental protection skill.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
