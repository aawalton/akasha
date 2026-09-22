import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const browser = {
  id: "01a06346-df12-7000-82c1-3f46040c2442",
  type: "page-type/domain",
  slug: "browser",
  definition: "a browser driven from code, and what is kept of a run",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "browser" }],
  parts: ["domain/browser-command", "domain/browser-test-harness", "module/launch-env"],
} as const satisfies Domain
