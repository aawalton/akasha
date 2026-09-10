import type { StoryDesign } from "../../story-design.page-type.types.ts"

export const cornerstone = {
  id: "01a0657d-bb8d-7066-b242-19bc27c9bf8c",
  pageTypeSlug: "story-design",
  type: "story-design",
  slug: "cornerstone",
  title: "Cornerstone — story design",
  world: "cornerstone",
  premise: "md",
  tone: "Cozy-but-consequential frontier fantasy. Warm, grounded, hopeful; stakes\nare real (scarcity, threats to the people who arrive) but the dominant feeling\nis building something that lasts. Wonder over grimdark.",
  themes:
    "Stewardship over conquest; the slow magic of a place becoming home;\nidentity rebuilt from foundation up; community as the unit of progress; the\nresponsibility of power you cannot wield directly.",
  readerFraming:
    "Interactive LitRPG. The reader IS the settlement core's will:\neach chapter builds to a decision and the reader chooses what to build, who to\nrecruit, or what to research. The prose then bends to that choice in the next\nchapter.",
  system: "settlement-core (system type TBD at Game Setup)",
} as const satisfies StoryDesign
