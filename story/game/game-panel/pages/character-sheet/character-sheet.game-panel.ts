import type { GamePanel } from "akasha/story/game/game-panel/game-panel.page-type.types.ts"

export const characterSheet = {
  id: "01a0c4a2-c666-7d73-9def-422c118760d9",
  type: "page-type/game-panel",
  slug: "character-sheet",
  definition: "what a character is made of, as the play has left it",
  code: "tsx",
  drawn: "js",
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
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot with nothing in it is not shown, so gear not yet owned is not foretold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The titles are not shown at all until the first title lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A part of the sheet already opened says it holds none yet rather than going away.",
    },
  ],
} as const satisfies GamePanel
