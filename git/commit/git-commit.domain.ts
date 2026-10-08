import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const gitCommit = {
  id: "01a0d894-2aaa-7e49-adca-dbeaf719040a",
  type: "page-type/domain",
  slug: "git-commit",
  definition: "a version of files that git keeps",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "commit" },
    { partOfSpeech: "part-of-speech/noun", spelling: "commits" },
  ],
  createdAt: "2026-09-25T12:39:44.042Z",
  updatedAt: "2026-09-25T16:10:02.000Z",
} as const satisfies Domain
