import type { Domain } from "../../../domain-system/domains/domain.page-type.ts"

export const attributes = {
  id: "01a0687a-f498-76b9-9a54-205509f15f64",
  pageTypeSlug: "domain",
  slug: "attributes",
  definition: "the points Alan's daily upkeep habits earned him on a day",
  partSlugs: [
    "workstation-service/attributes-reading-service",
    "workstation-service/attributes-relay-service",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The points are read from the tracking the workstation's checkout carries.",
    },
    {
      invariantKind: "departure",
      statement: "Every attribute the tracking day carries as a key is read in one ask.",
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
      statement:
        "The reading is taken by a workstation timer rather than by a pod serving a route.",
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
      statement: "A source that cannot be read stops its own readings and no other.",
    },
    {
      invariantKind: "departure",
      statement: "A carry that fails to one tile does not stop the carry to another tile.",
    },
    {
      invariantKind: "departure",
      statement:
        "A relay carrying many readings is given longer to run than one carrying a single reading.",
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
      invariantKind: "constraint",
      statement: "Points are counted forward from the day an attribute begins.",
    },
    {
      invariantKind: "constraint",
      statement: "No day before the day an attribute begins is backfilled.",
    },
  ],
} as const satisfies Domain
