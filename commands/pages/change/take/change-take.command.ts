import type { Command } from "../../../command.page-type.ts"

export const changeTake = {
  id: "01a08175-af77-75f4-8c7a-8b4315a39deb",
  pageTypeSlug: "command",
  type: "command",
  slug: "change-take",
  definition: "the command making a subagent's handed edits this agent's own",
  code: "ts",
  test: "ts",
  changeKind: "change-authored",
  helpNotes: [
    "a take names the subagent whose handed edits are taken.",
    "the subagent is named as a bare word, so no shell reads a quote or a backslash.",
    "the paths to take are piped in, one to a line, written `at` and the path.",
    "`all: true` piped in takes every edit that subagent handed, and no path is named beside it.",
    "a take piping nothing in is refused, so a bare call moves nothing.",
    "a take naming no subagent is refused rather than reaching every subagent.",
    "a take that would not fold is refused, and leaves both sets where those sets were.",
    "an edit taken is this agent's own, and `akasha change apply` lands it with the rest.",
    "an edit taken is no longer handed over, so one edit is never in both sets.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A take folds the handed edits it names into the edits this agent keeps.",
    },
    {
      invariantKind: "departure",
      statement: "A take that folds takes away the handed edits that were folded in.",
    },
    {
      invariantKind: "departure",
      statement: "A take that would not fold refuses and leaves both sets where those sets were.",
    },
    {
      invariantKind: "departure",
      statement: "A take naming no subagent is refused rather than reaching every subagent.",
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
      statement: "The paths a take moves are piped in.",
    },
    {
      invariantKind: "departure",
      statement: "A take piping nothing in is refused rather than moving every edit.",
    },
    {
      invariantKind: "departure",
      statement: "A take saying `all: true` moves every edit that subagent handed.",
    },
    {
      invariantKind: "departure",
      statement: "A take naming paths leaves handed over every edit no path named.",
    },
    {
      invariantKind: "departure",
      statement: "A path naming no edit that subagent handed refuses the take.",
    },
    {
      invariantKind: "departure",
      statement: "A take says how many edits are still handed over.",
    },
    {
      invariantKind: "departure",
      statement: "An agent whose page is nowhere is refused rather than answered with nothing.",
    },
    {
      invariantKind: "absence",
      statement: "A take lands nothing.",
    },
    {
      invariantKind: "absence",
      statement: "No taking is stated here.",
    },
  ],
} as const satisfies Command
