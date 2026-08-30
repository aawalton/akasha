import type { Check } from "../check.page-type.ts"

export const pageMatchesItsType = {
  id: "01a04e92-bfba-7ca8-b12b-37b6a6a4c408",
  pageTypeSlug: "check",
  slug: "page-matches-its-type",
  definition: "the check refusing a page that does not carry what its page type declares",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  runsOnPatch: true,
  runsOnWorktree: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "What a page must carry is read from its page type and the types above it rather than from a list written here.",
    },
    {
      invariantKind: "departure",
      statement: "A page type restating an inherited property narrows it.",
    },
    {
      invariantKind: "departure",
      statement: "A property its type declares uncommitted is not demanded of the page.",
    },
    {
      invariantKind: "departure",
      statement: "Such a value stands in a file beside the page rather than in the page.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating a property its type declares uncommitted is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A property its type declares secret is not demanded of the page.",
    },
    {
      invariantKind: "departure",
      statement: "Such a value stands in the page's sops file rather than in the page.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating a property its type declares secret is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page type the change carries is read as the change leaves it.",
    },
    {
      invariantKind: "departure",
      statement: "Where a page type stands is read from the index as the change leaves it.",
    },
    {
      invariantKind: "departure",
      statement: "A record's fields are judged against the record property that declares them.",
    },
    {
      invariantKind: "departure",
      statement: "A page whose page type declares nothing is passed over.",
    },
    {
      invariantKind: "departure",
      statement:
        "A text property stating a name format has each of its values judged by that format's own code rather than by a shape written here.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A max on a declaration counts entries and a max on a text property counts characters.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A max on a declaration and a max on a text property come from one property page read two ways.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A total on a declaration counts the characters of a list's values taken together.",
    },
    {
      invariantKind: "constraint",
      statement: "A name format is reached through the index and loaded off the disk.",
    },
    {
      invariantKind: "departure",
      statement: "A file the corpus names as a page and whose body declares no page is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A body that will not load declares none.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating no page type is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A property a generator fills is not required of a page being created.",
    },
    {
      invariantKind: "departure",
      statement: "It is required of every page already standing.",
    },
    {
      invariantKind: "departure",
      statement: "A page is being created when the base commit carries no body for its path.",
    },
    {
      invariantKind: "departure",
      statement: "This is read from the change and not from the disk.",
    },
    {
      invariantKind: "departure",
      statement: "Which properties a generator fills is read from the module owning that answer.",
    },
    {
      invariantKind: "absence",
      statement: "A value's own sort is not judged here.",
    },
  ],
} as const satisfies Check
