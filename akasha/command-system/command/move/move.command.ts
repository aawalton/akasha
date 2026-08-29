import type { Command } from "../command.page-type.ts"

export const move = {
  id: "01a04bed-1450-7dca-b1b5-ce3ca9f6ecaf",
  pageTypeSlug: "command",
  slug: "move",
  definition: "files carried to new paths, with everything the moved bodies name repointed in the same act",
  code: "ts",
  test: "ts",
  requiredReadingSlugs: [],
  design: [
    "A move repoints a relative specifier only; one naming a package is left alone.",
    "A page's sidecars go with it without being named.",
    "A body is carried as it stands but for the specifiers it holds, so a page's id crosses the move untouched.",
    "A move changes where a file stands, never what it is called, because a page states its own slug and other pages name it by that slug.",
    "What a moved body names is repointed from that body alone; what names a moved file is not, the index carrying no edge from a file to the files importing it.",
    "Every pair a call names lands together or not at all, because two files naming each other cannot move one at a time in any order.",
  ],
  intent: ["A file arrives at its new path reaching everything it reached before."],
} as const satisfies Command
