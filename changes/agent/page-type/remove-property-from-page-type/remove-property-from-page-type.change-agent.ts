import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const removePropertyFromPageType = {
  id: "01a08287-d90b-7f07-9a9e-bf6209c40126",
  type: "change-agent",
  slug: "remove-property-from-page-type",
  changeMode: "change-mode-remove",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "one page property taken off one page type",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type is handed to the mechanical change taking a property off one.",
    },
    {
      invariantKind: "departure",
      statement: "The part and the declaration are that change's one answer.",
    },
    {
      invariantKind: "departure",
      statement: "A property no page type declares after this goes in the same landing.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal from that change is the refusal this act gives.",
    },
    {
      invariantKind: "departure",
      statement: "The generator writes the page type's own type again from what this leaves.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "No change but that one rung is reached.",
    },
  ],
  changeKind: "change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
