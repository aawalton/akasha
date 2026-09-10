import type { CodeCheck } from "../../code-check.page-type.ts"

export const checkReachesAPathThroughTheIndex = {
  id: "01a0824b-5ca1-7150-a799-fd2189f44fe4",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "check-reaches-a-path-through-the-index",
  definition: "the check refusing a page's code that lists a path the index answers for",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The code of every page in the tree is judged rather than a check's code alone.",
    },
    {
      invariantKind: "departure",
      statement: "The page types a file may be named for are asked of the index.",
    },
    {
      invariantKind: "departure",
      statement:
        "A literal is judged by where that literal reaches rather than by what that literal spells.",
    },
    {
      invariantKind: "departure",
      statement: "A directory listing is `readdirSync`, `readdir` or `Glob`.",
    },
    {
      invariantKind: "departure",
      statement: "A literal reaching a directory listing is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A literal reaching anything else is let through.",
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
      statement: "A name with no separator is no path.",
    },
    {
      invariantKind: "departure",
      statement: "An expression has whatever a name inside that expression carries.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name carries what an initializer of that name has, worked out again until nothing changes.",
    },
    {
      invariantKind: "departure",
      statement: "A name a loop binds has what the source that loop runs over carries.",
    },
    {
      invariantKind: "departure",
      statement: "A name a `for in` loop binds is a key rather than what that loop runs over.",
    },
    {
      invariantKind: "departure",
      statement: "A name carries over the whole file rather than within the scope it is bound in.",
    },
    {
      invariantKind: "departure",
      statement: "One listing is refused once however many of its arguments have a path.",
    },
    {
      invariantKind: "departure",
      statement: "Every string a body has is read rather than the specifiers alone.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier is left to the checks that judge a specifier.",
    },
    {
      invariantKind: "departure",
      statement: "Only a page's code is judged, so a test's fixtures are no reach.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the line the listing sits on and the path the index answered.",
    },
    {
      invariantKind: "departure",
      statement: "A long literal is shortened where the refusal names that literal.",
    },
    {
      invariantKind: "absence",
      statement: "A path built from anything but plain strings is not seen.",
    },
    {
      invariantKind: "absence",
      statement: "A value a helper returns is not carried to the caller that lists it.",
    },
    {
      invariantKind: "gap",
      statement: "A path no page of the index sits at is seen by nothing here.",
    },
  ],
} as const satisfies CodeCheck
