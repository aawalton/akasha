import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const performance = {
  id: "01a08786-9212-746c-80e0-13134209de62",
  type: "page-type/page-type",
  slug: "performance",
  definition: "code that measures how fast something is",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "performance" }],
  extends: ["page-type/module"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A performance is run by naming that performance rather than by a check.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A performance run reports the measurement rather than refusing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A performance's test judges that performance's code rather than measuring.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One performance is run at a time.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No ceiling on processor time bounds a performance's run.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
