import type { ChangeGuard } from "../../change-guard.page-type.types.ts"

export const folderNotLeftNamed = {
  id: "01a08238-9081-766f-acab-30c5d8f612ee",
  pageTypeSlug: "change-guard",
  type: "change-guard",
  slug: "folder-not-left-named",
  changeTargetType: "change-target-type/file-content",
  definition: "the guard refusing an answer writing a body that spells a folder the answer empties",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folders an answer empties are read from the index that answer leaves.",
    },
    {
      invariantKind: "departure",
      statement: "A folder no path the index leaves sits under is a folder emptied.",
    },
    {
      invariantKind: "departure",
      statement:
        "The folder judged is the topmost folder emptied above a path the answer carried away.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body the answer writes spelling a string naming that folder refuses the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A string naming a path under that folder names that folder.",
    },
    {
      invariantKind: "departure",
      statement: "A string with no separator is a name rather than a path naming that folder.",
    },
    {
      invariantKind: "departure",
      statement:
        "A string is read as the body spells the string rather than against the folder the body sits in.",
    },
    {
      invariantKind: "departure",
      statement: "A body the answer had is read at the path the answer left that body.",
    },
    {
      invariantKind: "departure",
      statement: "Every body the answer writes is read.",
    },
    {
      invariantKind: "absence",
      statement: "No body the answer leaves alone is read.",
    },
    {
      invariantKind: "departure",
      statement: "A template is no string read here.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the body and the string it spells and the folder left empty.",
    },
    {
      invariantKind: "departure",
      statement: "An index a guard cannot read refuses the answer.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the working tree or the index on disk.",
    },
    {
      invariantKind: "departure",
      statement: "A body whose language is read is read as the strings that language spells.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body whose language is not read is read as the runs of path characters that body holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "Such a run is read again from each separator in it, so a path spelled after a variable is read.",
    },
    {
      invariantKind: "departure",
      statement: "A run opening with a separator names a place rather than a path in the checkout.",
    },
    {
      invariantKind: "departure",
      statement: "Such a run is read from the checkout's root on, and from no other separator.",
    },
    {
      invariantKind: "absence",
      statement: "A run naming a place outside the checkout names no folder here.",
    },
    {
      invariantKind: "departure",
      statement: "One rule judges a string a parser found and a run this guard found.",
    },
    {
      invariantKind: "gap",
      statement:
        "A run that only looks like a path is read as one, and refuses where that run names the folder.",
    },
  ],
} as const satisfies ChangeGuard
