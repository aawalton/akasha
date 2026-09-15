import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const keyNamesOneProperty = {
  id: "01a05424-3456-7724-8023-7e085329bffc",
  type: "page-type/check-code",
  slug: "key-names-one-property",
  definition: "the check with each of a declarer's keys to one property, narrowed where restated",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The properties judged are the properties a page type has after shadowing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An inherited key and a declared key meet as surely as two declared keys.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two declarations at the same key naming different properties collide.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No narrowing makes those two declarations one.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A restatement has the property's own key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A narrowing stands where another declaration already stands.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A restatement narrows.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Required never loosens.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A max only falls.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A unique kind only narrows.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A unique kind goes from `page` to `page-type` to `page-property`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A unique kind never goes back.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A restatement letting a unique kind go altogether widens that kind.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether a property is carried once or many times never changes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record property's fields are each held to one key like a page type's.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record property takes no declaration from any other page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The declarers of a property are read from the index rather than composed here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page type is judged when the change has that page type or a property that type declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type under a judged page type is judged as well.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record property is judged on the same two counts.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A declaration reaching no page property is not judged here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name reaching nothing is `relation-resolves`'s to refuse.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "Nothing here judges a key's format nor whether any page type declares the property.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
