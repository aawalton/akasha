import type { StoryDesign } from "../../story-design.page-type.ts"

export const theIdleEpoch = {
  id: "01a0657d-bb8d-7b68-95ee-ac453535d922",
  pageTypeSlug: "story-design",
  slug: "the-idle-epoch",
  title: "The Idle Epoch — story design",
  worldSlug: "the-idle-epoch",
  premise: "# The Idle Epoch — Premise",
  tone: '**Strategic progression fantasy with a builder protagonist.** The tone is grounded and technical without being dry. Callum thinks in systems, but he lives in a world where systems have life-and-death consequences. There is humor in the absurdity of applying factory optimization to monster-slaying, and genuine tension when carefully built loops encounter problems that cannot be automated.\n\nThe voice should feel like watching someone play an incredibly complex idle game while the idle game tries to eat them. Moments of satisfying system interlock ("the loop closed and the numbers started climbing") alternate with moments of real human stakes ("the Barrier flickered and everyone inside it held their breath").\n\nStat screens, System notifications, and mechanical details are woven into the narrative as Callum perceives them — part of his visual field, part of how he understands the world. They should enhance immersion, not interrupt it. Use them at moments of change (level-ups, skill unlocks, construct completions) rather than as info-dumps.',
  arcStructure:
    "The story is structured in four arcs, each corresponding to a phase of idle-game progression:\n\n| Arc | Title | Focus | Callum's State |\n|-----|-------|-------|----------------|\n| 1 | First Loop | Establishing the idle approach, first Condense, conflict with Drake | Level 12 to 25, first Condense, Prestige 0 to 1 |\n| 2 | Compound Interest | Exponential growth draws attention, System pushback begins | Multiple Condenses, Prestige 1 to 3, Thread Dancer unlock |\n| 3 | The Patch | The Substrate actively resists, broader political conflict | Prestige 3 to 5+, guild wars, Recursion Engine |\n| 4 | Singularity | The Substrate's purpose revealed, final choice | Prestige 10+, Loop Recursion approaches Level 5, climax |",
  genre: '[\n  "litrpg",\n  "progression fantasy",\n  "system apocalypse",\n  "automation"\n]',
  visualStyle:
    "industrial system-apocalypse LitRPG art; cold rust-belt light with cyan data-glow; gunmetal grey, oxidized orange, and electric blue palette; volumetric haze and machinery shadow; sleek semi-realistic finish, methodical and atmospheric",
  seriesName: "The Idle Epoch",
  seriesStatus: "Ongoing",
  bookTitle: "Arc 1: Boot Sequence",
  version: "1",
  prose: "txt",
} as const satisfies StoryDesign
