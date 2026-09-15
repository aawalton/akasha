import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployInferenceInstalling = {
  id: "01a090aa-b59e-76ef-b132-b9ef45af15d3",
  type: "module",
  slug: "deploy-inference-installing",
  definition: "one inference service provisioned onto the machine its page names",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One call reaches the one service it names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A service the host already holds at that hash is applied by nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A service not to be running is torn off the host rather than left there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The pool file is written from every service before the named one is applied.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Nothing is applied where the host has no GUI session for launchd to load an agent into.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A dry run reaches the host to read that host and changes nothing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here tears down a service the pages no longer name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder shipped to the host is read from the tree pinned at the commit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The pages a service is read from sit in the checkout rather than that tree.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each thing that reaches the host is named as soon as that thing reaches it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A fault part way is raised rather than answered, so the deploy names what reached the host.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reaching the host is done over is handed in.",
    },
  ],
} as const satisfies Module
