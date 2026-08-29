import type { Command } from "../command/command.page-type.ts"

export const edit = {
  id: "01a04ad5-d02a-7000-a8c5-47bd25423627",
  pageTypeSlug: "command",
  slug: "edit",
  definition: "a span of a file replaced by another, landed through the same door as a write",
  code: "ts",
  test: "ts",
  requiredReadingSlugs: ["command", "landing", "reading", "corpus", "write"],
  design: [
    "An edit becomes a whole body and lands as a write, reaching disk by no route of its own.",
    "A span matching nowhere, or in more than one place, is refused rather than guessed at.",
    "Two edits naming one file fold into one change, each matched against what the last left.",
    "A span is matched exactly, so what an agent read is what it must give back.",
  ],
} as const satisfies Command
