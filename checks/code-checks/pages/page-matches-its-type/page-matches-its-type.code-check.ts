import type { CodeCheck } from "../../code-check.page-type.ts"

export const pageMatchesItsType = {
  id: "01a04e92-bfba-7ca8-b12b-37b6a6a4c408",
  pageTypeSlug: "code-check",
  slug: "page-matches-its-type",
  definition: "the check refusing a page that does not carry what its page type declares",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  runsOnPatch: false,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "What a page must carry is read from its page type and the types above that page type.",
    },
    {
      invariantKind: "departure",
      statement: "A page type restating an inherited property narrows that property.",
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
      statement: "A page type the change carries is read as the change leaves that page type.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where a page type sits is read from the index as the change leaves that page type.",
    },
    {
      invariantKind: "departure",
      statement:
        "A record's fields are judged against the record property that declares those fields.",
    },
    {
      invariantKind: "departure",
      statement: "An entry beside the page is judged against the fields its property declares.",
    },
    {
      invariantKind: "departure",
      statement: "A numbered entry file beside the page is judged as the first file is judged.",
    },
    {
      invariantKind: "departure",
      statement: "An entry's own id is not judged as a field of the shape declaring the entry.",
    },
    {
      invariantKind: "departure",
      statement: "An entry carrying no id refuses the page.",
    },
    {
      invariantKind: "departure",
      statement: "An entry file that will not read refuses the page.",
    },
    {
      invariantKind: "gap",
      statement: "A change carrying an entry file alone is an input to this check.",
    },
    {
      invariantKind: "departure",
      statement: "A page whose page type declares nothing is passed over.",
    },
    {
      invariantKind: "departure",
      statement:
        "A text property stating a name format has every value judged by that format's own code.",
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
      statement: "A file the index names as a page and whose body declares no page is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A body that will not load declares no page.",
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
      statement: "A property a generator fills is required of every page that already exists.",
    },
    {
      invariantKind: "departure",
      statement: "A page is being created when the base commit carries no body for its path.",
    },
    {
      invariantKind: "departure",
      statement:
        "What counts as a page being created is read from the change and not from the disk.",
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
} as const satisfies CodeCheck
