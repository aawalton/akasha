import type { Command } from "../../../command.page-type.ts"

export const changeList = {
  id: "01a0816b-f0ae-7c9a-88cc-25ed0222c61f",
  pageTypeSlug: "command",
  type: "command",
  slug: "change-list",
  definition: "the edits an agent keeps, and the edits each subagent handed that agent",
  code: "ts",
  test: "ts",
  changeKind: "change-authored",
  helpNotes: [
    "a list naming nothing names the edits kept beside this agent's own page.",
    "a list names each subagent holding edits for this agent, and how many each one holds.",
    "a list naming a subagent names the edits that subagent handed over.",
    "the subagent is named as a bare word, so no shell reads a quote or a backslash.",
    "a list takes nothing piped in.",
    "a list changes nothing, so a list over the same edits twice says the same thing twice.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A list naming no subagent names the edits kept beside this agent's page.",
    },
    {
      invariantKind: "departure",
      statement: "That list names each subagent holding edits for this agent.",
    },
    {
      invariantKind: "departure",
      statement: "That list says how many edits each of those subagents has.",
    },
    {
      invariantKind: "departure",
      statement: "A list naming a subagent names the edits that subagent handed over.",
    },
    {
      invariantKind: "departure",
      statement: "An edit is said the way every act over the edits kept says an edit.",
    },
    {
      invariantKind: "departure",
      statement: "The edits are named in the order a name sorts rather than the order kept.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent is named as a bare word on the command line.",
    },
    {
      invariantKind: "departure",
      statement: "A second word after the subagent is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A flag where the subagent would be is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent with no edits for this agent is said rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "An agent keeping no edits is said rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "An agent whose page is nowhere is refused rather than answered with nothing.",
    },
    {
      invariantKind: "absence",
      statement: "A list takes nothing piped in.",
    },
    {
      invariantKind: "absence",
      statement: "A list writes nothing.",
    },
    {
      invariantKind: "absence",
      statement: "No taking is stated here.",
    },
    {
      invariantKind: "departure",
      statement: "The help flag reaches this command's own help notes.",
    },
  ],
} as const satisfies Command
