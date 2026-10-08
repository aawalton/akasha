import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const browser = {
  id: "01a06346-df12-7000-82c1-3f46040c2442",
  type: "page-type/domain",
  slug: "browser",
  definition: "how code uses a browser",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "browser" }],
  parts: ["domain/browser-command", "domain/browser-test-harness", "module/launch-env"],
  createdAt: "2026-09-02T17:59:44.146Z",
  updatedAt: "2026-09-25T13:58:45.000Z",
} as const satisfies Domain
