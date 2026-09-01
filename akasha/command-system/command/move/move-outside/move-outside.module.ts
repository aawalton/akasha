import type { Module } from "@akasha/code-system/module"

export const moveOutside = {
  id: "01a05f06-c7a5-7dd1-8ddd-a9cfa93cc222",
  pageTypeSlug: "module",
  slug: "move-outside",
  definition:
    "a tracked file outside the akasha folder respelled to name where a moved path arrived",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Which files outside the akasha folder spell a path that moved is answered by git rather than by the index.",
    },
    {
      invariantKind: "departure",
      statement: "Git is asked once for every path that moved rather than once for each one.",
    },
    {
      invariantKind: "departure",
      statement: "The bodies searched are the bodies the commit the move was read against holds.",
    },
    {
      invariantKind: "departure",
      statement: "A path under the akasha folder is left out of the search.",
    },
    {
      invariantKind: "departure",
      statement: "A body git reads as binary is left out of the search.",
    },
    {
      invariantKind: "departure",
      statement: "A search git could not run refuses the whole move.",
    },
    {
      invariantKind: "departure",
      statement: "A path is rewritten where the character after that path ends a path segment.",
    },
    {
      invariantKind: "departure",
      statement: "A path is rewritten where nothing follows that path.",
    },
    {
      invariantKind: "absence",
      statement: "A name carrying more of a segment than the path that moved is left alone.",
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
      statement: "The longest path matching at one place is the path written back.",
    },
    {
      invariantKind: "departure",
      statement: "A body is rewritten once with every name replaced where that name matched.",
    },
    {
      invariantKind: "departure",
      statement: "A body whose bytes are not utf-8 is left as that body was.",
    },
    {
      invariantKind: "departure",
      statement: "A body no rewriting changed is left out of the change.",
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
