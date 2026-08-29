import type { Command } from "../command.page-type.ts"

export const move = {
  id: "01a04bed-1450-7dca-b1b5-ce3ca9f6ecaf",
  pageTypeSlug: "command",
  slug: "move",
  definition:
    "files carried to new paths, with everything the moved bodies name repointed in the same act",
  code: "ts",
  test: "ts",
  mechanical: true,
  invariants: [
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
        "What a moved body names is repointed from that body alone; what names a moved file is not.",
    },
    {
      invariantKind: "departure",
      statement: "A missing index leaves what names a file unread rather than naming nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A path two pages claim leaves what names it unread rather than read from either.",
    },
    {
      invariantKind: "departure",
      statement: "Every pair a call names lands together or not at all.",
    },
    {
      invariantKind: "departure",
      statement: "`--dry-run` names every pair it would carry.",
    },
    {
      invariantKind: "gap",
      statement: "A file arrives at its new path reaching everything it reached before.",
    },
  ],
} as const satisfies Command
