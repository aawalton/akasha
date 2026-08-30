import type { Check } from "../check.page-type.ts"

export const introducedPropertyIsAPart = {
  id: "01a04f09-8646-7461-b69d-e026cd6561bf",
  pageTypeSlug: "check",
  slug: "introduced-property-is-a-part",
  definition:
    "the check holding a page type to naming the properties it introduces among its parts",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A property a page type introduces is one it declares and no page type above it declares.",
    },
    {
      invariantKind: "departure",
      statement: "A property two page types introduce is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "Every page type is judged whenever the change carries one.",
    },
    {
      invariantKind: "departure",
      statement: "A page type the change carries is read as the change leaves it.",
    },
    {
      invariantKind: "departure",
      statement: "Which page types stand is read from the index as the change leaves it.",
    },
    {
      invariantKind: "departure",
      statement: "What a page type above declares is read as the change leaves it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A part is matched by the slug it addresses rather than by the page type it names.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change carrying no page type is passed over before the index as the change leaves it is worked out.",
    },
    {
      invariantKind: "absence",
      statement: "Where the property's page stands in the folders is not judged here.",
    },
    {
      invariantKind: "absence",
      statement: "A property a page type restates to narrow it is no introduction.",
    },
    {
      invariantKind: "gap",
      statement: "A property two page types introduce stands under the one that introduces it.",
    },
  ],
} as const satisfies Check
