import type { StyleRule } from "akasha/story/style/style-rule/style-rule.page-type.types.ts"

export const noTropes = {
  id: "01a10360-ed37-70e4-8a8c-dd5c7258c6d1",
  type: "page-type/style-rule",
  slug: "no-tropes",
  name: "No Tropes",
  act: "Write what this person feels in this moment, never a stock line a thousand stories share.",
  warrant:
    "A trope reads as feeling the first time and as a formula after, so it costs the scene its truth.",
  aids: [
    "Never write that no one has ever done this for her, or that she is the first to.",
    "Show the feeling through what she does or says here, in words only she would use.",
  ],
  examples: [
    {
      before: '"No one\'s ever done that for me before," Tamsin whispered.',
      after:
        'Tamsin looked at the clean bandage for a long time. "Huh," she said, and flexed her hand.',
    },
  ],
} as const satisfies StyleRule
