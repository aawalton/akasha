import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiMilestones = {
  id: "01a0ea76-90e5-7447-b2e2-d93d3108e9e5",
  type: "page-type/lore",
  slug: "otherwhere-xi-milestones",
  title: "Milestones",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-mechanic/otherwhere-xi-milestones",
  facts: [
    {
      fact: "Each multiple of ten in a stat is a milestone that brings a new ability.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'A milestone is announced: "You have reached a milestone!" with what it gives.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'One stat\'s milestone can read "Your acuity has reached a milestone!"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Some milestones are announced instead with "You have reached a threshold!"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'An early mental milestone gives the inspect skill: "You have gained the inspect skill."',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An Acuity milestone gives faster perception, at the cost of fatigue.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Willpower milestone gives resistance to mental effects.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At 30 in the mental stats a caster can split attention across several glyphs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'An Endurance milestone reads "You can now wear armor for extended periods..."',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Acuity milestone at 40 slows time through a whole battle and allows three spells at once.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'The Willpower milestone at 40: "Your ability to influence and resist the influence of others',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "…has vastly improved. Transcendental tenacity: you can remain conscious and cast",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "…even as your body gives out. You can remain conscious after overusing mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '…Your casting efficiency has vastly improved."',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Power milestone makes spells stronger and longer-ranged, cast farther from the body.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'The same Power milestone adds: "Items that contain mages have a reduced effect on you."',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Milestones in the mental stats feed a caster's step: paths advance on milestones and deeds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Stat gains can stall until every mental stat is past a milestone, then tick up again.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
