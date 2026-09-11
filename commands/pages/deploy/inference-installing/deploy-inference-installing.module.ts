import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const deployInferenceInstalling = {
  id: "01a090aa-b59e-76ef-b132-b9ef45af15d3",
  type: "module",
  slug: "deploy-inference-installing",
  definition: "one inference service provisioned onto the machine its page names",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One call reaches the one service it names.",
    },
    {
      invariantKind: "departure",
      statement: "A service the host already holds at that hash is applied by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A service not to be running is torn off the host rather than left there.",
    },
    {
      invariantKind: "departure",
      statement: "The pool file is written from every service before the named one is applied.",
    },
    {
      invariantKind: "departure",
      statement:
        "Nothing is applied where the host has no GUI session for launchd to load an agent into.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run reaches the host to read that host and changes nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here tears down a service the pages no longer name.",
    },
    {
      invariantKind: "departure",
      statement: "The folder shipped to the host is read from the tree pinned at the commit.",
    },
    {
      invariantKind: "departure",
      statement: "The pages a service is read from sit in the checkout rather than that tree.",
    },
  ],
} as const satisfies Module
