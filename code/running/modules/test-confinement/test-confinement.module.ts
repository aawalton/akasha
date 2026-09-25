import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const testConfinement = {
  id: "01a0d998-1711-73f8-bfa6-5b8d9824fe5a",
  type: "page-type/module",
  slug: "test-confinement",
  definition: "the secret files a test run is kept from reading",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every test file runs where the secret files on its machine read as empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A secret folder is covered by an empty folder, and a secret file by an empty file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rest of the machine is left as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A test sees its own processes alone, so it reads no other process's variables.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A confined run cannot give a run inside it a process space of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run inside a test run shares the processes of the test run it is inside.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The secret files are found under the home of the run that starts the tests.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The file the workstation's secrets are loaded from is named by the page saving them.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "Every other secret place is named here, since no page states where it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A secret place also covers every place beside it whose name begins with its name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A star in a secret place represents every folder at that point.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder a cluster mounts a pod's secrets in is covered as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A secret place that is not on the machine is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The seat shell sandbox and this run use the same tool to confine.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A machine without that tool runs no test rather than running tests unconfined.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here chooses which variables a test run is handed.",
    },
  ],
} as const satisfies Module
