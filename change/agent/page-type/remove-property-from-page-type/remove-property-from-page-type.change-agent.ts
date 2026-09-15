import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const removePropertyFromPageType = {
  id: "01a08287-d90b-7f07-9a9e-bf6209c40126",
  type: "page-type/change-agent",
  slug: "remove-property-from-page-type",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "one page property taken off one page type",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type is handed to the mechanical change taking a property off one.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The part and the declaration are that change's one answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property no page type declares after this goes in the same landing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal from that change is the refusal this act gives.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The generator writes the page type's own type again from what this leaves.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No change but that one rung is reached.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
