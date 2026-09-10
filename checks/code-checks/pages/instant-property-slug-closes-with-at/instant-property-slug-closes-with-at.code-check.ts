import type { CodeCheck } from "../../code-check.page-type.ts"

export const instantPropertySlugClosesWithAt = {
  id: "01a058fe-c486-7dda-9fda-4e08c8681e57",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "instant-property-slug-closes-with-at",
  definition:
    "the check refusing a page standing under `instant-property` whose slug does not close with `-at`",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  check: { maxCpuSeconds: 10 },
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type the change itself puts under `instant-property` counts.",
    },
    {
      invariantKind: "departure",
      statement:
        "The slug judged is the slug the page states rather than the slug its file name says.",
    },
    {
      invariantKind: "absence",
      statement: "A file with no page value is not judged.",
    },
    {
      invariantKind: "absence",
      statement:
        "A file whose own name states no page type under `instant-property` is not judged.",
    },
    {
      invariantKind: "absence",
      statement:
        "A file named otherwise than the slug the page states is `page-named-as-stated`'s to refuse.",
    },
  ],
} as const satisfies CodeCheck
