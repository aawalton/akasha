import type { Check } from "../check.page-type.ts"

export const pageMatchesItsType = {
  id: "01a04e92-bfba-7ca8-b12b-37b6a6a4c408",
  pageTypeSlug: "check",
  slug: "page-matches-its-type",
  definition: "the check refusing a page that does not carry what its page type declares",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
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
        "A page type the change carries is read as the change leaves it, so a type and a page held to it land together.",
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
      invariantKind: "constraint",
      statement:
        "A max on a declaration counts entries, and a max on a text property counts characters, from one property page read two ways.",
    },
    {
      invariantKind: "absence",
      statement: "A value's own sort is not judged here, only whether the page carries what it must.",
    },
    {
      invariantKind: "gap",
      statement: "The whole tree matches its types, and the phases that judge it are turned on.",
    },
  ],
} as const satisfies Check
