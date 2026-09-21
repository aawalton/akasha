import type { GamePanel } from "akasha/story/game/panel/game-panel.page-type.types.ts"

export const characterSheet = {
  id: "01a0c4a2-c666-7d73-9def-422c118760d9",
  type: "page-type/game-panel",
  slug: "character-sheet",
  definition: "what a character is made of, as the play has left it",
  code: "tsx",
  place: "panel-place/aside",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An affinity is shown once gained, being knowledge its holder has earned.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An affinity is shown as its name and the bare count it holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The cap an affinity's count fills toward is not shown beside that count.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "No number behind an affinity is shown, neither its bias nor its cost nor its backlash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill is shown as its rung and the level it holds within that rung.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a gain felt like belongs to the prose rather than to this panel.",
    },
  ],
} as const satisfies GamePanel
