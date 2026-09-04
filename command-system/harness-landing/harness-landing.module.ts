import type { Module } from "@akasha/code-system/module"

export const harnessLanding = {
  id: "01a068b3-8055-7002-b15c-89df8a6b0a59",
  pageTypeSlug: "module",
  slug: "harness-landing",
  definition: "bodies written, paths removed and carries renamed, then committed as one commit",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Bodies land, removals unlink and carries rename before anything commits, so a failed commit is no no-op.",
    },
    {
      invariantKind: "departure",
      statement:
        "A failed commit names every path already applied and uncommitted, and the remedy.",
    },
    {
      invariantKind: "departure",
      statement: "A removal that names nothing git ever held is reported rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A removal naming a path that was never there refuses the landing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A composed body that comes out the same as what was there is not written and is not committed.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run reports the sizes it would write and commits nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that could not establish what git holds touches nothing at all.",
    },
  ],
} as const satisfies Module
