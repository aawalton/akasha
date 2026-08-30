import type { Check } from "../check.page-type.ts"

export const keyNamesOneProperty = {
  id: "01a05424-3456-7724-8023-7e085329bffc",
  pageTypeSlug: "check",
  slug: "key-names-one-property",
  definition:
    "the check holding each of a page type's keys to one property, narrowed where restated",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The properties judged are those a page type carries after shadowing.",
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
      statement: "A restatement narrows: required never loosens.",
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
      statement:
        "A page type is judged when the change carries it and when the change carries a property it declares.",
    },
    {
      invariantKind: "departure",
      statement:
        "A declaration reaching no page property is not judged here — a name reaching nothing is `relation-resolves`'s to refuse.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here judges a key's format nor whether any page type declares the property. Those stand elsewhere.",
    },
  ],
} as const satisfies Check
