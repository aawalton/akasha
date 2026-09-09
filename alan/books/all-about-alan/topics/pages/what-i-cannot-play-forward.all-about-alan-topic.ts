import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const whatICannotPlayForward = {
  id: "01a06559-9d65-798d-9778-0ee21ceffde9",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "what-i-cannot-play-forward",
  title: "What I Cannot Play Forward",
  definition: "the pre-play of what I am not inside, gated off while I am awake",
  parents: ["alan"],
  related: ["how-i-remember-anything", "how-i-decide", "the-pictures-at-the-edge-of-sleep"],
  settled:
    "While I am awake I cannot pre-play anything I am not currently inside.\n\nNo pictures, no dread running ahead of a thing going wrong, no feeling carried along a remembered track.\n\nIt is not missing hardware. Asleep the whole thing runs at full power, senses and feeling and plot.\n\nDisgust shows where the gap is: a past taste I cannot recall still crinkles my face, at a fifth of the strength.\n\nWith no forward reading of a wall, I treat every limit as movable and walk until I hit it.",
} as const satisfies AllAboutAlanTopic
