import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const machine = {
  id: "01a06596-0000-7000-8000-000000000301",
  type: "page-type/domain",
  slug: "machine",
  definition: "the machines Alan has",
  parts: ["domain/provisioning", "page-type/computer", "page-type/host", "domain/tmux"],
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "machine" },
    { partOfSpeech: "part-of-speech/noun", spelling: "machines" },
  ],
  createdAt: "2026-09-03T04:45:24.352Z",
  updatedAt: "2026-09-26T13:32:04.000Z",
} as const satisfies Domain
