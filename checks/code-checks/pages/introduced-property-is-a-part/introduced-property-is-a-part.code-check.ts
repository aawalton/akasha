import type { CodeCheck } from "../../code-check.page-type.ts"

export const introducedPropertyIsAPart = {
  id: "01a04f09-8646-7461-b69d-e026cd6561bf",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "introduced-property-is-a-part",
  definition: "the check with a page type to naming the properties it introduces among its parts",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property a page type introduces is a property that page type declares.",
    },
    {
      invariantKind: "departure",
      statement: "A property a page type above declares is no introduction.",
    },
    {
      invariantKind: "departure",
      statement: "A property two page types introduce is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "Every page type is judged whenever the change has a page type.",
    },
    {
      invariantKind: "departure",
      statement: "The properties a page type introduces are worked out once for the whole run.",
    },
    {
      invariantKind: "departure",
      statement: "A page type the change has is read as the change leaves the page type.",
    },
    {
      invariantKind: "departure",
      statement: "Which page types stand is read from the index as the change leaves the index.",
    },
    {
      invariantKind: "departure",
      statement:
        "The properties a page type above declares are read as the change leaves the page type above.",
    },
    {
      invariantKind: "departure",
      statement: "A page type is read from the page types gathered rather than looked for again.",
    },
    {
      invariantKind: "departure",
      statement: "A page type the gathering does not have is looked for in the index.",
    },
    {
      invariantKind: "departure",
      statement:
        "A part is matched by the slug the part addresses rather than by the page type the part names.",
    },
    {
      invariantKind: "departure",
      statement: "A change with no page type is passed over before the index is worked out.",
    },
    {
      invariantKind: "departure",
      statement: "A change taking a page type away is judged rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A page type the change takes away is not itself judged.",
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
      statement:
        "A property two page types introduce is a part of the page type that introduces that property.",
    },
  ],
  check: { maxCpuSeconds: 10 },
} as const satisfies CodeCheck
