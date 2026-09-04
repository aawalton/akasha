import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const requiredReading = {
  id: "01a04d97-c600-78b8-b3eb-faf390b009ce",
  pageTypeSlug: "domain",
  slug: "required-reading",
  definition: "the reading an agent cannot skip",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Required reading is a declared reading and everything that reading names in turn.",
    },
    {
      invariantKind: "departure",
      statement: "A document may require a second document that requires the first back.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing outside akasha asks an agent what the agent has read.",
    },
    {
      invariantKind: "departure",
      statement: "A seat refused for an unread document may read and search.",
    },
    {
      invariantKind: "absence",
      statement: "A seat refused for an unread document does nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "A seat is allowed to act where nothing identifies the agent.",
    },
    {
      invariantKind: "departure",
      statement: "An akasha write is refused where nothing identifies the agent.",
    },
    {
      invariantKind: "departure",
      statement: "A context replaced takes every reading the agent has made.",
    },
    {
      invariantKind: "departure",
      statement: "A body in the system prompt survives a context replacement.",
    },
    {
      invariantKind: "gap",
      statement: "A record names the body read apart from the body a mechanical change left.",
    },

    {
      invariantKind: "departure",
      statement: "An act is refused until its required reading is read.",
    },
    {
      invariantKind: "departure",
      statement: "Only a read the akasha system runs counts as read.",
    },
    {
      invariantKind: "departure",
      statement: "A body counts as read by whoever landed that body.",
    },
    {
      invariantKind: "departure",
      statement:
        "A read stops counting when what was read changes unless a mechanical change carried the read on.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal names the reading the refusal wants and the route that records that reading.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a seat must read is worked out from what its page states rather than listed.",
    },
    {
      invariantKind: "gap",
      statement: "No reading an agent needs falls outside the warrants.",
    },
    {
      invariantKind: "gap",
      statement: "A seat assigned an initiative reads that initiative's type.",
    },
    {
      invariantKind: "gap",
      statement: "A seat assigned an initiative reads the persona that initiative states.",
    },
    {
      invariantKind: "constraint",
      statement: "The tool definitions carry context nobody here controls.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Route Not Text",
      act: "Name the reading and the route that records it; never hand the agent the text.",
      warrant:
        "Handed text is disbelieved or truncated, and the record then shows a reading that never happened.",
      aids: [
        "Send neither the text nor a stand-in for it.",
        "A line quoted to point at work is not the text.",
      ],
    },

    {
      directiveKind: "principle",
      name: "Dilution",
      act: "Weigh an instruction against every reader at every boot, never against the one it was written for.",
      warrant:
        "The cost is not the line but the weight it takes off every other line, and nothing reports that.",
      aids: [
        "Put a line on the narrowest document it serves.",
        "Never reword a narrow line to sound general.",
      ],
    },
    {
      directiveKind: "principle",
      name: "Cut The Obvious",
      act: "Keep an instruction only where Opus 5 would consistently make avoidable mistakes without it.",
      warrant: "A line the model would have obeyed anyway reads exactly like one it needs.",
      aids: [
        "One agent's slip is not a consistent mistake.",
        "Test a single word the way you test a document.",
      ],
    },
  ],
} as const satisfies Domain
