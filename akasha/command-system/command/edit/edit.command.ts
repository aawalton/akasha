import type { Command } from "../command.page-type.ts"

export const edit = {
  id: "01a04beb-8a88-7a89-bcb5-4e546b75afbd",
  pageTypeSlug: "command",
  slug: "edit",
  definition:
    "stated substitutions worked out into whole bodies, gated together and landed or refused as one",
  code: "ts",
  test: "ts",
  requiredReadingSlugs: [],
  design: [
    {
      invariantKind: "departure",
      statement:
        "A substitution matching no times or more than once is refused before any check runs.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is not text is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A path that is not there is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file that changes under a call, between its read and its write, refuses the whole call.",
    },
    {
      invariantKind: "departure",
      statement:
        "Substitutions against one file are worked in the order stated, each against what the one before left.",
    },
    {
      invariantKind: "departure",
      statement: "A change is stated as exact passages, never as a diff.",
    },
    {
      invariantKind: "departure",
      statement: "A passage is the bytes of the file naming it, trailing newline and all.",
    },
    {
      invariantKind: "departure",
      statement:
        "Once the bodies are worked out this lands exactly as `write` lands, on the same gate and the same hold.",
    },
  ],
  intent: [
    {
      invariantKind: "gap",
      statement: "A caller states what a passage is and learns whether it was still that.",
    },
  ],
} as const satisfies Command
