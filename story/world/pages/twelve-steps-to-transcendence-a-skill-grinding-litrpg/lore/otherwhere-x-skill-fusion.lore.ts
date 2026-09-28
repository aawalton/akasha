import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXSkillFusion = {
  id: "01a0ea75-6dc2-70ae-bbf6-101ca8ad3ee6",
  type: "page-type/lore",
  slug: "otherwhere-x-skill-fusion",
  title: "Skill Fusion",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-mechanic/otherwhere-x-skill-fusion",
  facts: [
    {
      fact: "Skills can be fused into a higher-rank skill instead of levelled up.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fusion needs synergy, found first by using the skills together.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "To fuse, open status, focus on the chosen skills and mentally smash them together.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "If the chosen skills have no synergy, nothing happens.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Prompt: "Synergy detected between [Mana Reinforcement], [Unarmed Combat], and…"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '…"[Physical Conditioning]. Fusion requirements met."',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '…"Warning: The base skills will be permanently lost in the process."',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '…"This choice is irreversible. Do you wish to proceed?"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '…then "Skill fusion commencing…"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Result: "Congratulations! [Physical Conditioning] (Common), [Mana Reinforcement] (Uncommon),"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '…"and [Unarmed Combat] (Common) have fused into [Warforged - Lvl 1] (Rare)!"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fusion offers no choice of paths, unlike evolution.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fusion frees skill slots, since several skills become one.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Base skill levels set the fused skill's potency and efficiency, not necessarily its rarity.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A level 10 Common skill holds much denser essence than a level 5 one.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fusing underdeveloped skills gives unstable results that may be worse.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Noble Houses all know to wait and max skills before fusing.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Premature fusion matters little at early Tiers, more as skills grow complex.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A fused skill's window lists the skills it was fused from.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
