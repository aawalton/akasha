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
        "What a page must carry is read from its page type and the types above it, never from a list written here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type restating an inherited property narrows it, so the nearest declaration is the one that binds.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property its type declares uncommitted is not demanded of the page, because such a value stands in a file beside the page rather than in the page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page stating a property its type declares uncommitted is refused, because the commit would otherwise carry a value declared to stand outside it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type the change carries is read as the change leaves it, so a type and a page held to it land together.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where a page type stands is read from the index as the change leaves it, so a type the change puts above another is walked to and what it declares binds.",
    },
    {
      invariantKind: "departure",
      statement: "A record's fields are judged against the record property that declares them.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page whose page type declares nothing is passed over, because nothing settles what it would be held to.",
    },
    {
      invariantKind: "departure",
      statement:
        "A text property stating a name format has each of its values judged by that format's own code, never by a shape written here.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A max on a declaration counts entries, and a max on a text property counts characters, from one property page read two ways.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A total on a declaration counts the characters of a list's values taken together, and is never a third thing a max means.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A name format is reached through the index and loaded off the disk, so a format and the first property naming it do not land together.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file the corpus names as a page and whose body declares no page is refused, and a body that will not load declares none.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page stating no page type is refused, and is not passed over as one nothing settles.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property a generator fills is not required of a page being created, and is required of every page already standing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page is being created when the base commit carries no body for its path, which is read from the change and not from the disk.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which properties a generator fills is read from the module owning that answer, so a third one binds here with no code changed.",
    },
    {
      invariantKind: "absence",
      statement:
        "A value's own sort is not judged here, only whether the page carries what it must.",
    },
  ],
} as const satisfies Check
