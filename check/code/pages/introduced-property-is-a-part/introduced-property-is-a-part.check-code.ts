import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const introducedPropertyIsAPart = {
  id: "01a04f09-8646-7461-b69d-e026cd6561bf",
  type: "check-code",
  slug: "introduced-property-is-a-part",
  definition: "the check with a page type to naming the properties it introduces among its parts",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property a page type introduces is a property that page type declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property a page type above declares is no introduction.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property two page types introduce is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every page type is judged whenever the change has a page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The properties a page type introduces are worked out once for the whole run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type the change has is read as the change leaves the page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which page types stand is read from the index as the change leaves the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The properties a page type above declares are read as the change leaves the page type above.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type is read from the page types gathered rather than looked for again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type the gathering does not have is looked for in the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A part is matched by the slug the part addresses rather than by the page type the part names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change with no page type is passed over before the index is worked out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change taking a page type away is judged rather than passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type the change takes away is not itself judged.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Where the property's page stands in the folders is not judged here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A property a page type restates to narrow the property is no introduction.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal names the page type judged rather than a path the change has.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
