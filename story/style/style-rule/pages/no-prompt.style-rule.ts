import type { StyleRule } from "akasha/story/style/style-rule/style-rule.page-type.types.ts"

export const noPrompt = {
  id: "01a0e2f0-95c4-73a9-be13-f8d775176e7d",
  type: "page-type/style-rule",
  slug: "no-prompt",
  name: "No Prompt",
  act: "Tell what happens and end there; never ask, hint at or wait on what the player will do next.",
  warrant:
    "The action bar always asks him, so a prompt in the prose spends a line telling him what he can see.",
  aids: [
    "A character waiting to see what he will do is a prompt.",
    "Never address the player in the narrator's voice.",
    "One character may invite another in her own words.",
    "Every turn ending poised on his move is a prompt by pattern.",
    "Remove the prompt, never the fact the prompt carries.",
  ],
  examples: [
    {
      before: '"Take," she says quietly, and smiles at you, and waits to see what you\'ll do.',
      after: '"Take," she says quietly, and smiles at you.',
    },
  ],
} as const satisfies StyleRule
