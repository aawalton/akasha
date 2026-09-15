import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const refusalsKeeping = {
  id: "01a08165-a236-719a-95cf-da4ade5acc9f",
  type: "page-type/module",
  slug: "refusals-keeping",
  definition: "the refusals an agent's last landing or last audit answered with",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The refusals are written beside the agent's own page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The file is named for the property the agent page type declares for that kind of refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A landing's refusals and an audit's refusals are kept under two properties.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run keeping one of them leaves the other as it was.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path under no TypeScript name keeps no refusals.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run replaces the file rather than appending to the file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run refusing nothing takes the file away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One blank line parts two refusals in the file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal set one answer holds is handed back whole.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal set past that ceiling is handed back as a pointer to the file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The pointer names the path and the call opening that path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One wording names that path and that call, wherever a pointer is said.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller keeping refusals is handed back the path those refusals went to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that wrote no file hands back no path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "How many bytes one answer has is read from the module stating that count.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file the machine could not write leaves the refusals handed back whole.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges what a refusal says.",
    },
  ],
} as const satisfies Module
