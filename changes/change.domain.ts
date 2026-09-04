import type { Domain } from "../domains/domains/domain.page-type.ts"

export const change = {
  id: "01a05df1-e261-76a1-ad1e-0db3d857450e",
  pageTypeSlug: "domain",
  slug: "change",
  definition: "everything one act edits",
  pluralSlug: "changes",
  partSlugs: [
    "page-type/workflow-template",
    "page-type/change-kind",
    "workspace-package/workflow-language",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Nothing lands but through an akasha command or a service.",
    },
    {
      invariantKind: "departure",
      statement: "What a change is judged by follows from its kind.",
    },
    {
      invariantKind: "departure",
      statement: "No service lands a body an agent composed.",
    },
    {
      invariantKind: "departure",
      statement: "Every command's page names the kind of change that command lands.",
    },
    {
      invariantKind: "departure",
      statement: "What is handed to a command that lands is its change kind rather than a boolean.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Atomic Commit",
      act: "Stage and commit in one call, naming the paths that commit is for.",
      warrant:
        "The worktree on main is shared by every agent, so what is staged and not committed is swept up.",
      aids: [
        "Reaching for `-a` is not what makes it one call.",
        "Name the files, never a directory that may grow.",
        "A command that lands names its own paths for the same reason.",
      ],
    },
    {
      directiveKind: "principle",
      name: "Land In Pieces",
      act: "Split a change into landings that each stand on their own.",
      warrant: "A change too large to gather in one sitting is stale before it lands.",
      aids: [
        "Make the reader take both shapes first.",
        "Keep it whole only where half would read wrong.",
      ],
    },
  ],
} as const satisfies Domain
