import type { StyleRule } from "akasha/story/style/style-rule/style-rule.page-type.types.ts"

export const leaveItOpen = {
  id: "01a0e356-4fab-760a-a7d2-23505d3b7cba",
  type: "page-type/style-rule",
  slug: "leave-it-open",
  name: "Leave It Open",
  act: "End the turn on its last event, never on a line wrapping the moment up or moving the scene on.",
  warrant:
    "A closing line settles what he would have answered, so his next move lands on a passed moment.",
  aids: [
    "Moving the scene on, even a step, is his choice.",
    "Cut the last line wherever the turn reads whole without it.",
    "Ending on her act meets this rule and No Prompt; ending on her waiting meets neither.",
  ],
  examples: [
    {
      before:
        "She reaches out and taps your chest once. Her grin turns sly. Then she tugs your hand, and the two of you walk on up the canyon.",
      after: "She reaches out and taps your chest once. Her grin turns sly.",
    },
  ],
} as const satisfies StyleRule
