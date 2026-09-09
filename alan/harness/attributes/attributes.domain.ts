import type { Domain } from "../../../domains/domain.page-type.ts"

export const attributes = {
  id: "01a0687a-f498-76b9-9a54-205509f15f64",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "attributes",
  definition: "the points Alan's daily upkeep habits earned him on a day",
  parts: [
    "module/attributes-reading",
    "workstation-service/attributes-reading-service",
    "workstation-service/attributes-relay-service",
    "module/attributes-totalling",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The points are read from the tracking the workstation's checkout carries.",
    },
    {
      invariantKind: "departure",
      statement: "Every attribute the tracking day has as a key is read in one ask.",
    },
    {
      invariantKind: "departure",
      statement: "The stretches the charisma counts are filed under that day's id.",
    },
    {
      invariantKind: "departure",
      statement: "The charisma is read after the day rather than beside the day.",
    },
    {
      invariantKind: "departure",
      statement: "The constitution counts food entries rather than reading a figure off the day.",
    },

    {
      invariantKind: "departure",
      statement: "One timer takes every attribute reading.",
    },
    {
      invariantKind: "departure",
      statement: "One timer carries every attribute reading to the site that draws the attributes.",
    },
    {
      invariantKind: "departure",
      statement:
        "A source that cannot be read stops its own readings rather than another source's.",
    },
    {
      invariantKind: "departure",
      statement: "A carry that fails to one tile does not stop the carry to another tile.",
    },
    {
      invariantKind: "departure",
      statement:
        "A relay with many readings is given longer to run than a relay with a single reading.",
    },
    {
      invariantKind: "departure",
      statement: "The tile shows the points Alan's workstation last took.",
    },
    {
      invariantKind: "constraint",
      statement:
        "An attribute nothing can be read for is shown as no signal rather than as a zero.",
    },
    {
      invariantKind: "departure",
      statement:
        "`akasha measure attributes` answers an attribute's level beside that attribute's total.",
    },
    {
      invariantKind: "departure",
      statement: "An attribute no readout counts is left out of the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A total is floored to two decimal places.",
    },
    {
      invariantKind: "constraint",
      statement: "Points are counted forward from the day an attribute begins.",
    },
    {
      invariantKind: "constraint",
      statement: "No day before the day an attribute begins is backfilled.",
    },
  ],
} as const satisfies Domain
