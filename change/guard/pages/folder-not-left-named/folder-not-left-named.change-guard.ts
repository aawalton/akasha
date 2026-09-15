import type { ChangeGuard } from "akasha/change/guard/change-guard.page-type.types.ts"

export const folderNotLeftNamed = {
  id: "01a08238-9081-766f-acab-30c5d8f612ee",
  type: "change-guard",
  slug: "folder-not-left-named",
  changeTargetType: "change-target-type/file-content",
  definition: "the guard refusing an answer writing a body that spells a folder the answer empties",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folders an answer empties are read from the folders asked about.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder no file the answer leaves sits under is a folder emptied.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The folder judged is the topmost folder emptied above a path the answer carried away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A body the answer writes spelling a string naming that folder refuses the answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A string naming a path under that folder names that folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A string with no separator is a name rather than a path naming that folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A string is read as the body spells the string rather than against the folder the body sits in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body the answer had is read at the path the answer left that body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every body the answer writes by hand is read.\n",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No body the answer leaves alone is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A template is no string read here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The refusal names the body and the string it spells and the folder left empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An index a guard cannot read refuses the answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder asked about is read off the checkout as the tree has that folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That reading is laid over with the edits the change and the answer state.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file the change takes away or carries off sits under no folder after.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file the change writes or carries in sits under the folders above it.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No folder no string here names is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body whose language is read is read as the strings that language spells.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A body whose language is not read is read as the runs of path characters that body holds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Such a run is read again from each separator in it, so a path spelled after a variable is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run opening with a separator names a place rather than a path in the checkout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Such a run is read from the checkout's root on, and from no other separator.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A run naming a place outside the checkout names no folder here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One rule judges a string a parser found and a run this guard found.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A run one reading of which names a folder holding something names no folder emptied.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "A run that only looks like a path is read as one, and refuses where that run names the folder.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No body a machine writes is read, its writer running on the landing.",
    },
  ],
} as const satisfies ChangeGuard
