import type { Module } from "@akasha/code-system/module"

export const removeNaming = {
  id: "01a06262-70be-72a6-bd79-97c43cd61b5b",
  pageTypeSlug: "module",
  slug: "remove-naming",
  definition: "the tracked files still naming a path a removal takes, and what is said of them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every tracked body the base commit holds is looked at.",
    },
    {
      invariantKind: "departure",
      statement: "A body git reads as binary is left out of the search.",
    },
    {
      invariantKind: "departure",
      statement: "A path the removal takes is left out of what is answered.",
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
      statement: "What was looked for is said alongside what was found.",
    },
    {
      invariantKind: "departure",
      statement: "Finding nothing is said as plainly as finding something.",
    },
    {
      invariantKind: "departure",
      statement: "A caller that looked for nothing is answered with nothing to say.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here repoints a body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "departure",
      statement: "A path is looked for whole.",
    },
    {
      invariantKind: "departure",
      statement: "A path is ended where the path ends rather than where a longer path carries on.",
    },
    {
      invariantKind: "departure",
      statement: "The package name a manifest the removal takes declares is looked for as well.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest is read from the base commit rather than from the worktree.",
    },
    {
      invariantKind: "absence",
      statement: "A manifest that will not parse names no package here.",
    },
    {
      invariantKind: "departure",
      statement: "What a whole path or a declared name found is answered as the sure finding.",
    },
    {
      invariantKind: "departure",
      statement:
        "The last part of a file that goes is swept for where a slash sits beside that part.",
    },
    {
      invariantKind: "absence",
      statement: "A directory that goes is swept for by no last part of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A file under a path that goes is swept for by the last part of that file.",
    },
    {
      invariantKind: "departure",
      statement: "What only the wider sweep found is answered apart from the sure finding.",
    },
    {
      invariantKind: "absence",
      statement: "A file the sure finding holds is left out of the wider sweep.",
    },
    {
      invariantKind: "departure",
      statement: "How wide the wider sweep reaches is said where the sweep found anything.",
    },
    {
      invariantKind: "absence",
      statement: "A last part no slash sits beside is prose rather than a reach.",
    },
    {
      invariantKind: "departure",
      statement: "A finding naming what goes is answered apart from the rest.",
    },
    {
      invariantKind: "absence",
      statement: "A finding is a record of what was so rather than a file to repoint.",
    },
    {
      invariantKind: "gap",
      statement: "A body reaching what goes by a name of its own is found.",
    },
    {
      invariantKind: "gap",
      statement: "A body building a path out of pieces is found as one spelling that path whole.",
    },
    {
      invariantKind: "gap",
      statement:
        "A body spelling a last part of what goes with no slash beside that part is found.",
    },
    {
      invariantKind: "gap",
      statement: "A specifier is resolved through the manifest rather than looked for as text.",
    },
  ],
} as const satisfies Module
