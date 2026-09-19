import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployInferenceInstalling = {
  id: "01a090aa-b59e-76ef-b132-b9ef45af15d3",
  type: "page-type/module",
  slug: "deploy-inference-installing",
  definition: "one inference service provisioned onto the machine its page names",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One call reaches the one service it names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service the host already holds at that hash is applied by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service not to be running is torn off the host rather than left there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pool file is written from every service before the named one is applied.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Nothing is applied where the host has no GUI session for launchd to load an agent into.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here tears down a service the pages no longer name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder shipped to the host is read from the tree pinned at the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages a service is read from sit in the checkout rather than that tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each thing that reaches the host is named as soon as that thing reaches it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A fault part way is raised rather than answered, so the deploy names what reached the host.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reaching the host is done over is handed in.",
    },
  ],
} as const satisfies Module
