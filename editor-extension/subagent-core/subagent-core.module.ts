import type { Module } from "../../code-system/modules/module.page-type.ts"

export const subagentCore = {
  id: "01a064f0-734e-7c00-b4ef-b9db7fa30feb",
  pageTypeSlug: "module",
  slug: "subagent-core",
  definition: "the subagents a session's records show running",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subagent is held under the id of the tool call that ran the subagent.",
    },
    {
      invariantKind: "departure",
      statement: "Only a tool call named `Agent` starts a subagent.",
    },
    {
      invariantKind: "departure",
      statement: "A record saying every agent was killed stops every subagent at once.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent awaiting a first answer is stopped by the next assistant record.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent given no description is labelled by the kind the subagent was run as.",
    },
    {
      invariantKind: "departure",
      statement: "A tool result marked async leaves the subagent that result answers running.",
    },
    {
      invariantKind: "departure",
      statement: "A tool result carrying no result stops the subagent that result answers.",
    },
    {
      invariantKind: "departure",
      statement: "A resumed agent nothing here holds is filed under the resumed id as its own row.",
    },
    {
      invariantKind: "departure",
      statement: "A stop by the user is read out of the refusal text rather than out of a field.",
    },
    {
      invariantKind: "departure",
      statement: "A task notification naming a task id stops the subagent that id names.",
    },
    {
      invariantKind: "absence",
      statement: "A record carrying a tool result yields no notification text.",
    },
    {
      invariantKind: "departure",
      statement: "Running subagents are ordered by label and then by the id of the tool call.",
    },
  ],
} as const satisfies Module
