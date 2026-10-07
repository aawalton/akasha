import type { StyleRule } from "akasha/story/style/style-rule/style-rule.page-type.types.ts"

export const letThemTalk = {
  id: "01a113b5-c64c-7a88-aa00-f100f8ca1c02",
  type: "page-type/style-rule",
  slug: "let-them-talk",
  name: "Let Them Talk",
  act: "Let the characters carry a scene in their own words, with the narrator out of their way.",
  warrant:
    "A line the narrator tags, explains or sums up is a line the reader is told about, not one heard.",
  aids: [
    "Tag a line only where the reader would not know who speaks.",
    "Let the words show what a line means; never say how it was meant.",
    "Play a talk that matters as talk, and let one line answer another.",
  ],
} as const satisfies StyleRule
