import type { Module } from "@akasha/code/module"

export const refusalsKeeping = {
  id: "01a08165-a236-719a-95cf-da4ade5acc9f",
  pageTypeSlug: "module",
  type: "module",
  slug: "refusals-keeping",
  definition: "the refusals an agent's last landing answered with",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The refusals are written beside the agent's own page.",
    },
    {
      invariantKind: "departure",
      statement: "The file is named for the `refusals` property the agent page type declares.",
    },
    {
      invariantKind: "departure",
      statement: "A path under no TypeScript name keeps no refusals.",
    },
    {
      invariantKind: "departure",
      statement: "A run replaces the file rather than appending to the file.",
    },
    {
      invariantKind: "departure",
      statement: "A run refusing nothing takes the file away.",
    },
    {
      invariantKind: "departure",
      statement: "One blank line parts two refusals in the file.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal set one answer holds is handed back whole.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal set past that ceiling is handed back as a pointer to the file.",
    },
    {
      invariantKind: "departure",
      statement: "The pointer names the path and the call opening that path.",
    },
    {
      invariantKind: "departure",
      statement: "How many bytes one answer has is read from the module stating that count.",
    },
    {
      invariantKind: "departure",
      statement: "A file the machine could not write leaves the refusals handed back whole.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges what a refusal says.",
    },
  ],
} as const satisfies Module
