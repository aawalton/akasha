import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const testFanout = {
  id: "01a0685e-023f-7014-b6f1-0bc58a39a727",
  pageTypeSlug: "workspace-package",
  slug: "test-fanout",
  definition: "one test type run across every workspace bearing it, and the failures charged back",
  manifest: "json",
  partSlugs: [
    "module/fanout-failure-attribution",
    "module/reverse-reachability-artifact",
    "module/test-reverse-reachability",
    "module/test-selection",
    "module/triage-fanout-attribution",
    "module/triage-fanout-log",
    "module/triage-fanout-markers",
    "module/triage-fanout-render",
    "module/typed-workspace-listing",
    "shell-script/run-typed-tests",
    "shell-script/run-workspace-tests",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run that executed no test yields no verdict and refuses rather than passing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shard that crashed under batch load is run again alone before it is called a failure.",
    },
    {
      invariantKind: "departure",
      statement:
        "A workspace nested under another is pruned from the outer one so its files run once.",
    },
    {
      invariantKind: "departure",
      statement: "A reading the map cannot place runs its full test set rather than none.",
    },
    {
      invariantKind: "departure",
      statement: "The map is keyed on a commit rather than on the working tree.",
    },
    {
      invariantKind: "departure",
      statement: "The map is written whole or not at all.",
    },
    {
      invariantKind: "gap",
      statement: "What builds the import graph the map is read off stands outside akasha.",
    },
  ],
} as const satisfies WorkspacePackage
