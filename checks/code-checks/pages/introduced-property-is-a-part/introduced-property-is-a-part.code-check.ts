import type { CodeCheck } from "../../code-check.page-type.ts"

export const introducedPropertyIsAPart = {
  id: "01a04f09-8646-7461-b69d-e026cd6561bf",
  pageTypeSlug: "code-check",
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
      statement: "Every page type is judged whenever the change carries a page type.",
    },
    {
      invariantKind: "departure",
      statement: "A page type the change carries is read as the change leaves the page type.",
    },
    {
      invariantKind: "departure",
      statement: "Which page types stand is read from the index as the change leaves the index.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a page type above declares is read as the change leaves the page type above.",
    },
    {
      invariantKind: "departure",
      statement:
        "A part is matched by the slug the part addresses rather than by the page type the part names.",
    },
    {
      invariantKind: "departure",
      statement: "A change carrying no page type is passed over before the index is worked out.",
    },
    {
      invariantKind: "absence",
      statement: "Where the property's page stands in the folders is not judged here.",
    },
    {
      invariantKind: "absence",
      statement: "A property a page type restates to narrow the property is no introduction.",
    },
    {
      invariantKind: "gap",
      statement: "A property two page types introduce stands under the one that introduces it.",
    },
  ],
} as const satisfies CodeCheck
