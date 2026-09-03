import type { StoryDesign } from "../story-design.page-type.ts"

export const cornerstone = {
  id: "01a0657d-bb8d-7066-b242-19bc27c9bf8c",
  pageTypeSlug: "story-design",
  slug: "cornerstone",
  title: "Cornerstone — story design",
  worldSlug: "cornerstone",
  premise:
    '"The protagonist dies and is reincarnated not as a person but as a\n  **settlement core** — a buried, half-sentient heartstone that anchors a\n  fledgling town. They cannot walk, fight, or speak in the ordinary way; they\n  perceive the world through the land bound to them and act by shaping what gets\n  built upon it. To grow, they must attract and keep townsfolk, raise the right\n  buildings, and research upgrades that deepen what the settlement can become.\n  Their consciousness and their domain expand together: the stronger the town,\n  the stronger the core, and vice versa."',
  readerFraming:
    '"Interactive LitRPG. The reader IS the settlement core\'s will:\n  each chapter builds to a decision and the reader chooses what to build, who to\n  recruit, or what to research. The prose then bends to that choice in the next\n  chapter."',
  system: "settlement-core (system type TBD at Game Setup)",
  themes:
    "Stewardship over conquest; the slow magic of a place becoming home;\n  identity rebuilt from foundation up; community as the unit of progress; the\n  responsibility of power you cannot wield directly.",
  tone: "Cozy-but-consequential frontier fantasy. Warm, grounded, hopeful; stakes\n  are real (scarcity, threats to the people who arrive) but the dominant feeling\n  is building something that lasts. Wonder over grimdark.",
} as const satisfies StoryDesign
