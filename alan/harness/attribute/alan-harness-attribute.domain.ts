import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const alanHarnessAttribute = {
  id: "01a0687a-f498-76b9-9a54-205509f15f64",
  type: "page-type/domain",
  slug: "alan-harness-attribute",
  definition: "the points Alan's daily upkeep habits earned him on a day",
  parts: [
    "module/attributes-reading",
    "module/attributes-totalling",
    "service-workstation/attributes-relay-service",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The points are read from the tracking the workstation's checkout carries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every attribute the tracking day has as a key is read in one ask.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The stretches the charisma counts are filed under that day's id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The charisma is read after the day rather than beside the day.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The constitution counts food entries rather than reading a figure off the day.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "One watch takes every attribute reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One timer carries every attribute reading to the site that draws the attributes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A source that cannot be read stops its own readings rather than another source's.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A carry that fails to one tile does not stop the carry to another tile.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A relay with many readings is given longer to run than a relay with a single reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The tile shows the points Alan's workstation last took.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "An attribute nothing can be read for is shown as no signal rather than as a zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "`akasha measure attribute` answers an attribute's level beside that attribute's total.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An attribute no readout counts is left out of the answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A total is floored to two decimal places.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Points are counted forward from the day an attribute begins.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "No day before the day an attribute begins is backfilled.",
    },
  ],
} as const satisfies Domain
