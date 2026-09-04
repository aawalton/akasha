import type { Module } from "@akasha/code-system/module"

export const outsideNaming = {
  id: "01a05f2c-6eb9-79ac-8d42-8c7a796c1ece",
  pageTypeSlug: "module",
  slug: "outside-naming",
  definition: "a tracked file found by what it names and respelled",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Which tracked files carry a name is answered by git rather than by the index.",
    },
    {
      invariantKind: "departure",
      statement: "The search covers every file the commit tracks.",
    },
    {
      invariantKind: "departure",
      statement: "Git is asked for many names at once rather than once for each one.",
    },
    {
      invariantKind: "departure",
      statement: "More names than one command line carries are asked for over more calls.",
    },
    {
      invariantKind: "departure",
      statement: "What every call found is answered as one answer with each path said once.",
    },
    {
      invariantKind: "departure",
      statement: "A part is looked for where a slash sits beside the part.",
    },
    {
      invariantKind: "departure",
      statement: "The parts one call asks after share one pattern.",
    },
    {
      invariantKind: "departure",
      statement:
        "A whole name is looked for where the segment ending that name runs on no further.",
    },
    {
      invariantKind: "absence",
      statement: "What leads a whole name is left open.",
    },
    {
      invariantKind: "absence",
      statement: "A name carrying more of a segment than the part looked for is left out.",
    },
    {
      invariantKind: "departure",
      statement: "A name holding no slash is respelled only where a slash goes on under that name.",
    },
    {
      invariantKind: "departure",
      statement: "A character a pattern would read as a pattern is looked for as that character.",
    },
    {
      invariantKind: "departure",
      statement: "The bodies searched are the bodies the commit handed in holds.",
    },
    {
      invariantKind: "departure",
      statement: "A path the caller already respelled is left out of a respelling.",
    },
    {
      invariantKind: "departure",
      statement: "A body git reads as binary is left out of the search.",
    },
    {
      invariantKind: "departure",
      statement: "A search git could not run is answered as a refusal for the caller to carry.",
    },
    {
      invariantKind: "departure",
      statement: "A caller naming nothing is answered with no file rather than by asking git.",
    },
    {
      invariantKind: "departure",
      statement: "How a body is respelled is handed in rather than worked out here.",
    },
    {
      invariantKind: "departure",
      statement: "A body whose bytes are not utf-8 is left as that body was.",
    },
    {
      invariantKind: "departure",
      statement: "A body the respelling did not change is left out of the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A body that changed is answered with its bytes and with the text it came from.",
    },
    {
      invariantKind: "departure",
      statement: "A name is rewritten where the character after that name ends a path segment.",
    },
    {
      invariantKind: "departure",
      statement: "A name is rewritten where nothing follows that name.",
    },
    {
      invariantKind: "absence",
      statement: "A name carrying more of a segment than the name looked for is left alone.",
    },
    {
      invariantKind: "absence",
      statement: "A name another path character leads is left alone.",
    },
    {
      invariantKind: "absence",
      statement: "A name a package name leads is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "The longest name matching at one place is the name written back.",
    },
    {
      invariantKind: "departure",
      statement: "A body is rewritten once with every place replaced where a place matched.",
    },
    {
      invariantKind: "departure",
      statement: "A place another place already covered is passed over.",
    },
    {
      invariantKind: "absence",
      statement: "No specifier is read here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here commits.",
    },
  ],
} as const satisfies Module
