import type { CodeCheck } from "../../code-check.page-type.ts"

export const instantPropertySlugClosesWithAt = {
  id: "01a058fe-c486-7dda-9fda-4e08c8681e57",
  pageTypeSlug: "code-check",
  slug: "instant-property-slug-closes-with-at",
  definition:
    "the check refusing a page standing under `instant-property` whose slug does not close with `-at`",
  code: "ts",
  test: "ts",
  runsOnPatch: false,
  runsOnWorktree: true,
  runsOnDeploy: true,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type the change itself puts under `instant-property` counts.",
    },
    {
      invariantKind: "departure",
      statement:
        "The slug judged is the one the page states rather than the one its file name says.",
    },
    {
      invariantKind: "absence",
      statement: "A file holding no page value is not judged.",
    },
    {
      invariantKind: "absence",
      statement: "A path outside the akasha folder is passed over.",
    },
    {
      invariantKind: "absence",
      statement:
        "A file named otherwise than the slug the page states is `page-named-as-stated`'s to refuse.",
    },
  ],
} as const satisfies CodeCheck
