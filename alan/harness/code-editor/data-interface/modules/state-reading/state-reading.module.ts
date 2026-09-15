import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const stateReading = {
  id: "01a072b8-a766-7b44-b1e8-c0c04920e385",
  type: "page-type/module",
  slug: "state-reading",
  definition: "how a part of the editor reads the one file that part draws",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder is watched rather than the file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder above is watched too.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder taken away and put back is watched again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A part whose folder is not there yet is told once that folder arrives.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write replaces the file itself.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each part's file sits in a folder of that part's own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "One watcher serves every part reading one folder rather than one watcher for each part.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A part draws the state already there before any change arrives.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A read that failed draws nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The last good read is left on the screen.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file with the same bytes as the last read is drawn no second time.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here has a timer.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works a picture out from the repository.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A read that is saved changes nothing a caller can see.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A part is told of no write another part's folder takes.",
    },
  ],
} as const satisfies Module
