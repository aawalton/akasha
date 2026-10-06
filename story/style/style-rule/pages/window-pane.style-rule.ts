import type { StyleRule } from "akasha/story/style/style-rule/style-rule.page-type.types.ts"

export const windowPane = {
  id: "01a11344-5fa5-72f1-879f-30f88acce1b6",
  type: "page-type/style-rule",
  slug: "window-pane",
  name: "Window Pane",
  act: "Write prose the reader looks through to the story, never prose the reader looks at.",
  warrant: "A sentence that draws attention to itself distracts from the story.",
  aids: [
    "Say each thing once, in the plainest words that carry it.",
    "Let what happens set a sentence's length and shape, never a habit of the voice.",
    "A reader should come away remembering the scene, not the sentences.",
  ],
} as const satisfies StyleRule
