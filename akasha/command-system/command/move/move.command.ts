import type { Command } from "../command.page-type.ts"

export const move = {
  id: "01a04bed-1450-7dca-b1b5-ce3ca9f6ecaf",
  pageTypeSlug: "command",
  slug: "move",
  definition:
    "files carried to new paths, with everything the moved bodies name repointed in the same act",
  code: "ts",
  test: "ts",
  requiredReadingSlugs: [],
  design: [
    {
      invariantKind: "absence",
      statement: "A move repoints a relative specifier only; one naming a package is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A page's sidecars go with it without being named.",
    },
    {
      invariantKind: "departure",
      statement: "A body is carried as it stands but for the specifiers it holds.",
    },
    {
      invariantKind: "departure",
      statement: "A move changes where a file stands, never what it is called.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a moved body names is repointed from that body alone; what names a moved file is not, the index carrying no edge from a file to the files importing it.",
    },
    {
      invariantKind: "departure",
      statement: "Every pair a call names lands together or not at all.",
    },
    {
      invariantKind: "departure",
      statement:
        "`--dry-run` works the whole move out, gates it, and names every pair it would carry, writing nothing at all, not a file and not a loose object.",
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
      statement: "A file arrives at its new path reaching everything it reached before.",
    },
  ],
} as const satisfies Command
