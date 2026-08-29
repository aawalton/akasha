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
      statement:
        "Everything taken without being named is reported, so a caller reads what went beyond what it asked for.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every path a call names is refused in one answer, so a caller is not told about them one at a time.",
    },
    {
      invariantKind: "departure",
      statement:
        "`--dry-run` names everything that would go, what was named and what was not, writing nothing at all, not a file and not a loose object.",
    },
    {
      invariantKind: "departure",
      statement:
        "A dry run says that no check judged the removal, a check being never handed a deletion, so it claims nothing about what would stand after.",
    },
  ],
  intent: [
    {
      invariantKind: "gap",
      statement: "What a removal leaves behind still stands up on its own.",
    },
  ],
} as const satisfies Command
