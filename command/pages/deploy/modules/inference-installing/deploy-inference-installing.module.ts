import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployInferenceInstalling = {
  id: "01a090aa-b59e-76ef-b132-b9ef45af15d3",
  type: "page-type/module",
  slug: "deploy-inference-installing",
  definition: "an inference service provisioned onto the machine its page names",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One call puts up the one service it names.",
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
      decisionKind: "decision-kind/departure",
      statement:
        "Every service on the host that no page names is torn off before the named one is put up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name any page names, on any host, is never torn down for being unnamed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The traffic cop is never torn down for being unnamed.",
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
