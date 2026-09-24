import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperCapturePlayerAnswer = {
  id: "01a0d572-a98c-731f-a331-cd7f1939586f",
  type: "page-type/domain",
  slug: "temper-capture-player-answer",
  definition: "what the game answers the functions it is asked about the character playing now",
  parts: ["module/player-asking-shapes", "module/player-askings-reading"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The answers stay on the player's machine and are never committed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function is asked with values the game itself lists for the character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The harness answers a function the way the game answered it here.",
    },
  ],
} as const satisfies Domain
