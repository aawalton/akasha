import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const repoRoots = {
  id: "01a0691b-4f65-7e5d-ad7c-a9523f441291",
  type: "page-type/shell-script",
  slug: "repo-roots",
  definition: "where this checkout is, exported to the shell that read this in",
  shell: "sh",
  sourced: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The checkout is found by walking up from this script to the folder holding akasha's own page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No count of folders is written between this script and that root.",
    },
  ],
  createdAt: "2026-09-03T21:09:52.613Z",
  updatedAt: "2026-10-30T16:24:43.274Z",
} as const satisfies ShellScript
