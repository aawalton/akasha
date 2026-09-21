import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const viewNamesADeclaredKey = {
  id: "01a0c570-c14d-7bbc-9008-feed418845bb",
  type: "page-type/check-code",
  slug: "view-names-a-declared-key",
  definition: "the check with every key a view names declared by the page type that view lists",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A view names a key the page type that view lists declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key that page type declares nothing for is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Which fields of a view name a key is read from the page property behind each field.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field holding many values is judged at each of them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field of a record is judged in each record the holding key states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key parted by dots is judged by the segment before the first dot.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The keys a page type declares are the keys that page type has after shadowing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key is the property slug rather than the name a page spells that slug as.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A view listing no page type is passed over rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A view listing a page type that cannot be read is passed over here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name reaching no page type is `relation-resolves`'s to refuse.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An audit judges every view the index files.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change judges the views that change could have made stale.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A view the change writes is among those.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A view listing a page type the change writes is among those.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A view listing a page type under one the change writes is among those.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A view listing a page type that carries a page property the change writes is among those.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change writing the view page type or a property of it reaches every view.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "What a change costs here follows the change and the type graph, not how many views there are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A change to a page type or to a page property breaks a view that change names nowhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type under the view page type has its pages judged as well.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges a field of a view that names no key.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges whether a page carries a value under the key named.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
