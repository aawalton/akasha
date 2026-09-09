import type { StoryDesign } from "../../story-design.page-type.ts"

export const breathOfTheWild = {
  id: "01a0657d-bb8d-7cfd-8351-b0c78ba096f6",
  pageTypeSlug: "story-design",
  type: "story-design",
  slug: "breath-of-the-wild",
  title: "Breath of the Wild: The Chronicle of Hyrule — story design",
  world: "hyrule",
  premise: "md",
  genre: "LitRPG / Fantasy Novelization",
  tone: "Elegiac but hopeful. Third-person close on Link (silence as rich interiority) with multi-POV for Champions-era chapters. Adaptive LitRPG integration — system fades during emotional scenes, comes alive during combat and puzzles.",
  themes:
    "Memory and identity — who are you when you've forgotten yourself?; Duty vs. self — the cost of being 'chosen' (Link's silence, Zelda's failed prayers); Impermanence — weapons break, kingdoms fall, but bonds endure; Legacy and inheritance — the Champions' gifts, the Sheikah's abandoned technology, the cycle of hero/princess/demon; Silence and connection — Link's wordless bonds, Zelda's desperate research, the Champions' different languages of care",
  visualStyle:
    "sweeping painterly adventure-fantasy art in Ghibli-adjacent register; elegiac golden-hour light over vast ruined wilds; soft sky-blue, meadow green, and ancient-bronze palette; luminous atmospheric depth; hopeful, wistful finish",
  arcStructure: "md",
  structure:
    "Dual timeline alternating between Champions' era (100 years ago, building toward the Calamity) and Link's present journey (recovery and redemption). Deep past woven into both timelines through discovery. The past timeline is tragedy; the present is its repair.",
  memoryDistribution:
    "note: 13 base memories distributed across Acts 2-4. Not recovered in game order — resequenced for narrative impact.\nact_2:\n  - Memory #1 (Subdued Ceremony, Ch7 past)\n  - Memory #10 (Mipha's Touch, Ch10 past)\nact_3:\n  - Memory #2 (Revali's Flap, Ch17)\n  - Memory #4 (Daruk's Mettle, Ch14)\n  - Memory #5 (Zelda's Resentment, Ch16 past)\n  - Memory #6 (Urbosa's Hand, Ch19 past)\n  - Memory #7 (Blades of the Yiga, Ch19 past + Ch20 recovery)\n  - Memory #8 (A Premonition, Ch24 past)\n  - Memory #9 (Silent Princess, Ch16 past)\n  - Memory #11 (Shelter from Storm, Ch25)\n  - Memory #12 (Father and Daughter, Ch23 past)\n  - Memory #13 (Slippery Falcon, Ch24 past)\n  - Memory #14 (To Mount Lanayru, Ch25)\nact_4:\n  - Memory #15 (Return of Calamity Ganon, Ch28)\n  - Memory #16 (Despair, Ch29)\n  - Memory #17 (Zelda's Awakening, Ch29)",
  timelineDistribution:
    "both: 6\nnote: Dual timeline. 'Present' = Link's amnesiac journey. 'Past' = Champions' era (100 years ago). 'Both' = memory recovery chapters or timeline transitions.\npast: 8\npresent: 21",
} as const satisfies StoryDesign
