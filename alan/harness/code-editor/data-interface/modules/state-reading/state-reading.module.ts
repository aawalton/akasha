import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const stateReading = {
  id: "01a072b8-a766-7b44-b1e8-c0c04920e385",
  type: "page-type/module",
  slug: "state-reading",
  definition: "how a part of the editor reads the file that part draws",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A part reads its file with the schema its data interface's code holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file the schema refuses is a read that failed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the schema does not name is dropped rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder is watched rather than the file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder above is watched too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder taken away and put back is watched again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part whose folder is not there yet is told once that folder arrives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write replaces the file itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each part's file sits in a folder of that part's own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One watcher serves every part reading one folder rather than one watcher for each part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part draws the state already there before any change arrives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read that failed draws nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The last good read is left on the screen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file with the same bytes as the last read is drawn no second time.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here has a timer.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works a picture out from the repository.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A read that is saved changes nothing a caller can see.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part is told of no write another part's folder takes.",
    },
  ],
} as const satisfies Module
