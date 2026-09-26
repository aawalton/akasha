import type { StoryDesign } from "akasha/story/world/designs/story-design.page-type.types.ts"

export const cornerstone = {
  id: "01a0657d-bb8d-7066-b242-19bc27c9bf8c",
  type: "page-type/story-design",
  slug: "cornerstone",
  title: "Cornerstone — story design",
  world: "world/cornerstone",
  premise: "md",
  tone: "Cozy-but-consequential frontier fantasy. Warm, grounded, hopeful; stakes\nare real (scarcity, threats to the people who arrive) but the dominant feeling\nis building something that lasts. Wonder over grimdark.",
  themes:
    "Stewardship over conquest; the slow magic of a place becoming home;\nidentity rebuilt from foundation up; community as the unit of progress; the\nresponsibility of power you cannot wield directly.",
  readerFraming:
    "Interactive LitRPG. The reader IS the settlement core's will:\neach chapter builds to a decision and the reader chooses what to build, who to\nrecruit, or what to research. The prose then bends to that choice in the next\nchapter.",
  system: "settlement-core (system type TBD at Game Setup)",
  structure:
    "Wakefulness tier bands widen as the core climbs, about 4 chapters in Aware, 6 in Watchful, 8 in Knowing and 10 in Dreaming, so each tier-up is a longer, harder climb than the last. The simulated landings are Aware at chapter 1, Watchful at 5, Knowing at 11 and Dreaming at 19. The mid-game Knowing milestone near chapter 11 means every sense awakened, several deep, and the first fused Power within reach. The decisions run BUILD-heavy early, waking senses; interleave BUILD and RECRUIT mid-game, rooting and rounding out; and run RESEARCH-heavy late, fusing into Dreaming-tier Powers: a sleeping stone becoming a dreaming guardian.",
} as const satisfies StoryDesign
