import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const editsRepointing = {
  id: "01a0e9a9-6ec4-77d0-b53c-03c3ae20a98a",
  type: "page-type/module",
  slug: "edits-repointing",
  definition: "the drafted edits an agent or a turn keeps, pointed at the paths a landing moved",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A drafted edit names a path rather than a page id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A landing that moves a path points every drafted edit naming that path at where the path went.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path under a folder moved goes where that folder went.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every path a drafted edit names is pointed again, whichever side of it that path is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The drafted edits pointed again are every seat's, subagent's, played turn's and written chapter's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The records a seat keeps for its subagents gone are pointed again too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such a record keeps what it says of the subagent that left it and when.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Drafted edits left beside a page moved without them follow it to where it went.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A writer pointing the edits again takes the turn every writer of them takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Edits that name no path moved are neither locked nor written again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Edits holding a move the landing made are the landing's own and are left as they are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Edits a line refuses are left as they are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Edits that could not be pointed again are named rather than stopping the landing.",
    },
  ],
} as const satisfies Module
