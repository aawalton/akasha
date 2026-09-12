import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const importLines = {
  id: "01a08cda-348f-7c87-89fb-04be4a6a3124",
  type: "module",
  slug: "import-lines",
  definition: "the import lines a body carries, read and written as text",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every name an import line names is answered with the path it comes from.",
    },
    {
      invariantKind: "departure",
      statement: "A name is answered as a type where its line or its own entry says type.",
    },
    {
      invariantKind: "departure",
      statement: "A name spelled as a key rather than reached is not among the names a node names.",
    },
    {
      invariantKind: "departure",
      statement: "A name imported under another name is answered by the name at its source.",
    },
    {
      invariantKind: "departure",
      statement: "A name taken out of a line leaves the other names that line carries.",
    },
    {
      invariantKind: "departure",
      statement:
        "Names taken out of a body together leave one passage for each line those names sat on.",
    },
    {
      invariantKind: "departure",
      statement: "A line losing every name that line carried leaves no line.",
    },
    {
      invariantKind: "departure",
      statement: "A line naming everything a path exports is answered under the name it binds.",
    },
    {
      invariantKind: "departure",
      statement: "Such a line is written from that name and that path rather than from a list.",
    },
    {
      invariantKind: "departure",
      statement: "The only name such a line carries is that name, so taking it leaves no line.",
    },
    {
      invariantKind: "departure",
      statement: "The anchor a body offers is the last import line that body holds.",
    },
    {
      invariantKind: "departure",
      statement: "A body holding no import line offers no anchor.",
    },
    {
      invariantKind: "departure",
      statement: "A line put into a body follows the anchor that body offers.",
    },
    {
      invariantKind: "departure",
      statement: "A line opening a body with no anchor is parted from that body by a blank line.",
    },
    {
      invariantKind: "constraint",
      statement: "A line spelling no path is refused rather than composed.",
    },
    {
      invariantKind: "departure",
      statement: "An import from an empty path is whole syntax, so no parse catches it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides which lines a body should carry.",
    },
    {
      invariantKind: "departure",
      statement: "A name put into a body joins the line that body already takes from that path.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value joining a line marked type throughout marks every name that line already carried.",
    },
    {
      invariantKind: "departure",
      statement: "A type joining a line of values is marked a type on its own.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body holding no line from that path, or a line already naming it, takes no name.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every name a body's import lines bind is answered together with the name at its source.",
    },
    {
      invariantKind: "departure",
      statement:
        "Names taken from one path are written as one line, and a namespace name as a line of its own.",
    },
  ],
} as const satisfies Module
