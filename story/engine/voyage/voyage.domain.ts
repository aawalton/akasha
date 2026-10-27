import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const voyage = {
  id: "01a17e94-d82a-756c-8ab0-01dcc4b79396",
  type: "page-type/domain",
  slug: "voyage",
  definition: "the roleplay site the story engine is measured against",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Voyage" }],
  parts: ["domain/inworld-tts"],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Voyage signs in at `https://voyage.io/signin` with an email and a password.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The Voyage email and password are `VOYAGE_USERNAME` and `VOYAGE_PASSWORD` in `~/.secrets.env`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent signs its browser in to Voyage afresh in each session.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No saved Voyage session is handed to every seat's browser.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reference game is Alan's Sword Art Online save on Voyage.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The reference game is at `https://voyage.io/play?slot=1&saveId=872618&room=34GYH55X`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An agent looks at the reference game and takes no turn in it unless Alan says to.",
    },
  ],
  createdAt: "2026-10-27T18:17:26.313Z",
  updatedAt: "2026-10-27T18:33:16.286Z",
} as const satisfies Domain
