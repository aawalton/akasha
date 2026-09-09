import type { Module } from "../../../../../code-system/modules/module.page-type.ts"

export const stateReading = {
  id: "01a072b8-a766-7b44-b1e8-c0c04920e385",
  pageTypeSlug: "module",
  slug: "state-reading",
  definition: "how a part of the editor reads the one file that part draws",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The folder is watched rather than the file.",
    },
    {
      invariantKind: "departure",
      statement: "A write replaces the file itself.",
    },
    {
      invariantKind: "departure",
      statement:
        "One watcher serves every part of the editor rather than one watcher for each part.",
    },
    {
      invariantKind: "departure",
      statement: "A part draws the state already there before any change arrives.",
    },
    {
      invariantKind: "departure",
      statement: "A read that failed draws nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The last good read is left on the screen.",
    },
    {
      invariantKind: "departure",
      statement: "A file with the same bytes as the last read is drawn no second time.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here has a timer.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works a picture out from the repository.",
    },
    {
      invariantKind: "constraint",
      statement: "A read that is saved changes nothing a caller can see.",
    },
    {
      invariantKind: "gap",
      statement: "A test fails where the name filter is taken out.",
    },
    {
      invariantKind: "gap",
      statement: "The name filter is shown by the count of events a folder raises.",
    },
  ],
} as const satisfies Module
