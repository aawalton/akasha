import type { Command } from "akasha/command/command.page-type.types.ts"

export const infrastructureServiceBundle = {
  id: "01a0c9a3-8601-769d-b508-7d0d5b2ef40f",
  type: "page-type/command",
  slug: "infrastructure-service-bundle",
  definition: "the command building one service's running code into a single file",
  code: "ts",
  name: "bundle",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One service is named, and one at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The code bundled is the named service's `running` group.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service page is found through the index rather than by the folder it sits in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug no service page carries is refused as a fault of the call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service whose running code is not there is refused rather than bundled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Code the bundler will not resolve is refused with what the bundler said.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bundle is filed under the commit the checkout is at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer names the file written, its size, and the seconds the build took.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The size the answer names is the bundle's with its inline source map in it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer names the bundles kept and the bundles the sweep removed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No flag bundles every service at once.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A unit's ExecStart names the file this writes.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A deploy bundles each service at that service's own commit.",
    },
  ],
  arguments: [{ argument: "argument/workstation-service", required: true, saidAs: "word" }],
} as const satisfies Command
