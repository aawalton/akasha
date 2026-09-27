import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const desktopApp = {
  id: "01a0e380-aeaa-711e-8a5f-2ef9eab6222b",
  type: "page-type/page-type",
  slug: "desktop-app",
  definition: "a program Alan runs on the workstation's desktop",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "desktop app" },
    { partOfSpeech: "part-of-speech/noun", spelling: "desktop apps" },
  ],
  extends: ["page-type/akasha-service"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A desktop app is built from the checkout named for its slug under the repositories root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A deploy puts a desktop app up by running the promote script that checkout carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a deploy puts up is the commit that checkout's head names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The promote script decides whether a build is good enough to put up.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
