import type { CodeCheck } from "../../code-check.page-type.ts"

export const pageMatchesItsType = {
  id: "01a04e92-bfba-7ca8-b12b-37b6a6a4c408",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "page-matches-its-type",
  definition: "the check refusing a page that does not carry what its page type declares",
  parts: ["module/entry-reasons"],
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The properties a page must have are read from its page type and the types above that page type.",
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
      statement: "A property its type fixes a value for is not demanded of the page.",
    },
    {
      invariantKind: "departure",
      statement: "Every page of that type has that value without stating it.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating a property its type fixes is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A property its type works out is not demanded of the page.",
    },
    {
      invariantKind: "departure",
      statement: "Such a value is worked out as the page is read rather than kept in the page.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating a property its type works out is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The words that refusal prints are read from the refusal's own page.",
    },
    {
      invariantKind: "departure",
      statement: "A page type the change has is read as the change leaves that page type.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where a page type sits is read from the index as the change leaves that page type.",
    },
    {
      invariantKind: "departure",
      statement: "A page type the index does not name is passed over rather than throwing.",
    },
    {
      invariantKind: "gap",
      statement: "A change with an entry file alone is an input to this check.",
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
      statement: "A count on a declaration counts entries and a length counts characters.",
    },
    {
      invariantKind: "constraint",
      statement: "A declaration's length narrows the length its property states.",
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
      statement: "A page is being created when the base commit has no body for its path.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a page is being created is read from the change and not from the disk.",
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
