import type { ChangeGuard } from "../../change-guard.page-type.ts"

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
        "The folder judged is the topmost one emptied above a path the answer carried away.",
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
        "A string is read as the body spells it rather than against the folder the body sits in.",
    },
    {
      invariantKind: "departure",
      statement: "A body the answer had is read at the path the answer left it.",
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
      statement: "The refusal names the body, the string it spells and the folder left empty.",
    },
    {
      invariantKind: "departure",
      statement: "An index a guard cannot read refuses the answer.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the working tree or the index on disk.",
    },
  ],
} as const satisfies ChangeGuard
