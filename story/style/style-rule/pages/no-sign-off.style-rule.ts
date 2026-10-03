import type { StyleRule } from "akasha/story/style/style-rule/style-rule.page-type.types.ts"

export const noSignOff = {
  id: "01a1031b-5866-7475-8f0d-e205068daee5",
  type: "page-type/style-rule",
  slug: "no-sign-off",
  name: "No Sign-Off",
  act: "End a chapter on its last event, never on a line saying the chapter or the day is over.",
  warrant:
    "A sign-off reads as an ending once, and repeated chapter after chapter reads as a formula.",
  aids: [
    "A line restating the story's chapter break is a sign-off, even where a beat holds it.",
    "A last line an earlier chapter of the story ends on is a sign-off, however it is reworded.",
    "Cut the sign-off and write nothing in its place.",
  ],
  examples: [
    {
      before: "You sleep there on the rug, tangled, under the cup.\n\nA day at Hollowmere ends.",
      after: "You sleep there on the rug, tangled, under the cup.",
    },
  ],
} as const satisfies StyleRule
