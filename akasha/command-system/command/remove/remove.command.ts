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
    "A path that is not there is refused.",
    "A directory opens onto every tracked file under it.",
    "A directory holding no tracked file is refused.",
    "A page's sidecars go with it without being named.",
    "A directory the removal leaves empty goes with it.",
    "Everything taken without being named is reported, so a caller reads what went beyond what it asked for.",
    "Every path a call names is refused in one answer, so a caller is not told about them one at a time.",
    "`--dry-run` names everything that would go, what was named and what was not, writing nothing at all, not a file and not a loose object.",
    "A dry run says that no check judged the removal, a check being never handed a deletion, so it claims nothing about what would stand after.",
  ],
  intent: ["What a removal leaves behind still stands up on its own."],
} as const satisfies Command
