import type { Command } from "../command.page-type.ts"

export const remove = {
  id: "01a04bed-1461-7364-8579-6799d5aa8ea0",
  pageTypeSlug: "command",
  slug: "remove",
  definition: "named paths taken away, gated together and removed or refused as one",
  code: "ts",
  test: "ts",
  requiredReadingSlugs: [],
  design: [
    {
      invariantKind: "departure",
      statement: "A path that is not there is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A directory opens onto every tracked file under it.",
    },
    {
      invariantKind: "departure",
      statement: "A directory holding no tracked file is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page's sidecars go with it without being named.",
    },
    {
      invariantKind: "departure",
      statement: "A directory the removal leaves empty goes with it.",
    },
    {
      invariantKind: "departure",
      statement: "Everything taken without being named is reported.",
    },
    {
      invariantKind: "departure",
      statement: "Every path a call names is refused in one answer.",
    },
    {
      invariantKind: "departure",
      statement:
        "`--dry-run` names everything that would go, what was named and what was not, writing nothing at all, not a file and not a loose object.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path is named behind `--file-path`, as `write` and `edit` name theirs, and a path standing on its own is refused rather than read as one.",
    },
    {
      invariantKind: "departure",
      statement:
        "`--break-the-glass <reason>` runs no check and stamps the reason into the commit as a trailer.",
    },
    {
      invariantKind: "constraint",
      statement:
        "`--dry-run` and `--break-the-glass` are refused together, one reporting what the checks say and the other running none.",
    },
  ],
  intent: [
    {
      invariantKind: "gap",
      statement: "What a removal leaves behind still stands up on its own.",
    },
  ],
} as const satisfies Command
