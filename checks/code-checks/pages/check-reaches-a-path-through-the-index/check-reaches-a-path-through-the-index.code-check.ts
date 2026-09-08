import type { CodeCheck } from "../../code-check.page-type.ts"

export const checkReachesAPathThroughTheIndex = {
  id: "01a0824b-5ca1-7150-a799-fd2189f44fe4",
  pageTypeSlug: "code-check",
  slug: "check-reaches-a-path-through-the-index",
  definition: "the check refusing a check that spells a path the index answers for",
  code: "ts",
  test: "ts",
  runsOnPatch: false,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The check package and the page types passed over are asked of the index.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path is spelled where the index knows a page at it, under it, or ending with it.",
    },
    {
      invariantKind: "departure",
      statement: "A literal ending in a separator names the folder that separator closes.",
    },
    {
      invariantKind: "departure",
      statement: "A name holding no separator is no path.",
    },
    {
      invariantKind: "departure",
      statement: "Every string a body holds is read rather than the specifiers alone.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier is left to the checks that judge a specifier.",
    },
    {
      invariantKind: "departure",
      statement:
        "A literal naming a path is refused whether that path is reached or matched against.",
    },
    {
      invariantKind: "departure",
      statement: "Only a page's code is judged, so a test's fixtures are no reach.",
    },
    {
      invariantKind: "departure",
      statement: "A syntax rule is passed over, since only the file handed in is read there.",
    },
    {
      invariantKind: "stopgap",
      statement: "The cluster checks are passed over while that check system is being taken away.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the line the literal sits on and the path the index answered.",
    },
    {
      invariantKind: "departure",
      statement: "A long literal is shortened where the refusal names that literal.",
    },
    {
      invariantKind: "departure",
      statement:
        "An index that cannot say where the check package sits refuses rather than judging clean.",
    },
    {
      invariantKind: "absence",
      statement: "A path built from anything but plain strings is not seen.",
    },
    {
      invariantKind: "gap",
      statement: "A path no page of the index sits at is seen by nothing here.",
    },
  ],
} as const satisfies CodeCheck
