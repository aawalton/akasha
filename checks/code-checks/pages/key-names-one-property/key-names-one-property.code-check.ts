import type { CodeCheck } from "../../code-check.page-type.ts"

export const keyNamesOneProperty = {
  id: "01a05424-3456-7724-8023-7e085329bffc",
  pageTypeSlug: "code-check",
  slug: "key-names-one-property",
  definition:
    "the check holding each of a declarer's keys to one property, narrowed where restated",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  runsOnPatch: false,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The properties judged are the properties a page type carries after shadowing.",
    },
    {
      invariantKind: "departure",
      statement: "One inherited and one declared meet as surely as two declared.",
    },
    {
      invariantKind: "departure",
      statement: "Two declarations at one key naming different properties collide.",
    },
    {
      invariantKind: "departure",
      statement: "No narrowing makes them one.",
    },
    {
      invariantKind: "departure",
      statement: "A restatement carries the property's own key.",
    },
    {
      invariantKind: "departure",
      statement: "A narrowing stands where another declaration already stands.",
    },
    {
      invariantKind: "departure",
      statement: "A restatement narrows.",
    },
    {
      invariantKind: "departure",
      statement: "Required never loosens.",
    },
    {
      invariantKind: "departure",
      statement: "A max only falls.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a property is carried once or many never changes.",
    },
    {
      invariantKind: "departure",
      statement: "A record property's fields are each held to one key like a page type's.",
    },
    {
      invariantKind: "departure",
      statement: "A record property takes no declaration from any other page.",
    },
    {
      invariantKind: "departure",
      statement: "What declares a property is read from the index rather than composed here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type is judged when the change carries that page type or a property that type declares.",
    },
    {
      invariantKind: "departure",
      statement: "A record property is judged on the same two counts.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration reaching no page property is not judged here.",
    },
    {
      invariantKind: "departure",
      statement: "A name reaching nothing is `relation-resolves`'s to refuse.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here judges a key's format nor whether any page type declares the property.",
    },
  ],
} as const satisfies CodeCheck
