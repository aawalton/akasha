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
} as const satisfies Domain
