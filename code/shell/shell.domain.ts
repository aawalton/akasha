import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const shell = {
  id: "01a05d9b-277a-7000-be3d-95c4cf94638d",
  type: "page-type/domain",
  slug: "shell",
  definition: "text a POSIX shell reads as a command",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "shell" }],
  parts: ["domain/shell-terminal", "module/quoting"],
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "The native shell an iOS app is built into is not this package.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value written into a command is written so the shell reads that value as one word.",
    },
  ],
} as const satisfies Domain
