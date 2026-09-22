import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const design = {
  id: "01a05b55-a539-7a1c-9bdc-5a459722f028",
  type: "page-type/domain",
  slug: "design",
  definition: "how something is done well",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "design" }],
  parts: [
    "domain/design-game",
    "domain/design-interface",
    "domain/design-language",
    "domain/technology",
    "domain/design-play",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A design package reads the router through a context rather than importing the router.",
    },
  ],
  directives: [],
} as const satisfies Domain
