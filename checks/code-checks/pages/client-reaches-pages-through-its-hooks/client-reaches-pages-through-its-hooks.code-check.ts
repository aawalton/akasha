import type { CodeCheck } from "../../code-check.page-type.ts"

export const clientReachesPagesThroughItsHooks = {
  id: "01a0820f-3f92-7000-bc58-d6e15f27ad99",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "client-reaches-pages-through-its-hooks",
  definition: "the check refusing a browser file reaching the pages table outside the pages hooks",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A browser file is one whose opening statements have the `use client` directive.",
    },
    {
      invariantKind: "departure",
      statement: "Each side of the boundary is found in the index by its workspace package page.",
    },
    {
      invariantKind: "departure",
      statement: "A side's folder is the folder its page sits in.",
    },
    {
      invariantKind: "departure",
      statement: "The specifier a side is reached by is read from the manifest beside that page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A side whose manifest calls it nothing is reached only by a path into its folder.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier landing inside a side's folder reaches that side.",
    },
    {
      invariantKind: "departure",
      statement: "A call to a value the access package answers is refused.",
    },
    {
      invariantKind: "departure",
      statement: "That call is let through where a call to a hooks package value encloses it.",
    },
    {
      invariantKind: "departure",
      statement: "A chain reading the `pages` table by name is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A `postgres_changes` subscription on the `pages` table is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A subscription is refused though a hooks package call encloses it.",
    },
    {
      invariantKind: "departure",
      statement: "The hooks package and the store package beside it are not judged by this rule.",
    },
    {
      invariantKind: "departure",
      statement: "The exemption for those two is read from their pages rather than from a path.",
    },
    {
      invariantKind: "absence",
      statement: "A type-only import reaches neither side.",
    },
    {
      invariantKind: "absence",
      statement: "An index naming no access package or no hooks package judges clean.",
    },
    {
      invariantKind: "absence",
      statement: "No file is let off by name.",
    },
  ],
} as const satisfies CodeCheck
