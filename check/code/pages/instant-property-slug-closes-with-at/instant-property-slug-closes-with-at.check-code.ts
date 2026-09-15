import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const instantPropertySlugClosesWithAt = {
  id: "01a058fe-c486-7dda-9fda-4e08c8681e57",
  type: "check-code",
  slug: "instant-property-slug-closes-with-at",
  definition:
    "the check refusing a page standing under `instant-property` whose slug does not close with `-at`",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type the change itself puts under `instant-property` counts.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The slug judged is the slug the page states rather than the slug its file name says.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A file with no page value is not judged.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "A file whose own name states no page type under `instant-property` is not judged.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "A file named otherwise than the slug the page states is `page-named-as-stated`'s to refuse.",
    },
  ],
  check: { maxCpuSeconds: 1 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
