import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const type = {
  id: "01a049e9-651c-7006-896c-2bffa71e2d0a",
  type: "page-type/domain",
  slug: "type",
  definition: "the shape a value must have",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "type" },
    { partOfSpeech: "part-of-speech/noun", spelling: "types" },
    { partOfSpeech: "part-of-speech/adjective", spelling: "typed" },
  ],
  parts: ["domain/type-import", "domain/type-narrowing"],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A type is gone by the time the code runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page satisfies its type rather than being annotated with that type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type's TypeScript type is declared in the page type file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page of the wrong shape does not compile.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A limit no type can have is enforced by a check.",
    },
  ],
} as const satisfies Domain
