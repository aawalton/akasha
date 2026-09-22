import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const codeMoving = {
  id: "01a09467-62d1-7e1e-b24d-b6186ad6cf98",
  type: "page-type/module",
  slug: "code-moving",
  definition: "whether the code a run is running has moved since that run started",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Reading that commit is one read of one small file rather than a run of git.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A commit no file gives back is no commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run asks whether the code it is running moved rather than whether a place it named moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run whose unit names no bundle cannot tell whether its code moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Cannot tell is an answer of its own rather than the answer that nothing moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run that cannot tell says so once, the first time it is asked, and goes on working.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What that run says names the folder it looked from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that started at no commit cannot tell, however its unit reads later.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit a run started at is taken as this module is first imported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run leaves on the one exit every long-running unit is written to start again for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run says on the way out the commit it started at and the commit it is leaving for.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rules on whether the point this is called at is safe.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here waits, and nothing here does a unit of work.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs git.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes the unit, which the deploy building that bundle writes.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here asks systemd anything.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads where the checkout sits or holds a path up against it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here ends a run whose code it cannot tell about.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run loaded from a bundle came out of the commit that bundle is named for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The commit a bundled run is leaving for is the one the unit beside that bundle names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That unit is read as a file rather than asked of systemd.",
    },
  ],
} as const satisfies Module
