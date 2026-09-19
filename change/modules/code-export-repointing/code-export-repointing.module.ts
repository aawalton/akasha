import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const codeExportRepointing = {
  id: "01a0b795-3ef9-7cd7-bd07-ddeb56621fcf",
  type: "page-type/module",
  slug: "code-export-repointing",
  definition: "the passages pointing every body that names a carried export at where it landed",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every body importing an export carried names the path that export landed at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body naming several of those exports is rewritten in one passage.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An export carried joins the line the body naming it already takes from that landing.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "A line that body takes from the landing under a default or a namespace is joined by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A body naming such an export under another name goes on naming the export under that name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A body naming such an export through a package names the export from the workspace root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A body whose text could not be read refuses the carry rather than being passed over.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a body.",
    },
  ],
} as const satisfies Module
