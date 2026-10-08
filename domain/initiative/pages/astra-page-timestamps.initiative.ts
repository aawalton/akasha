import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const astraPageTimestamps = {
  id: "01a11bf1-2669-7cd3-a8ba-fb83ab35ca21",
  type: "page-type/initiative",
  slug: "astra-page-timestamps",
  domain: "page-type/page",
  persona: "persona/astra",
  intentStack: [
    {
      statement: "A page being created is given the moment it was created as `created-at`.",
    },
    {
      statement:
        "A page whose committed values change is given that moment as `updated-at`, whatever the change.",
    },
    {
      statement: "A change to a page's uncommitted values alone leaves `updated-at` as it was.",
    },
    {
      statement:
        "Every page states the moment it was created and the moment its values last changed.",
    },
    {
      statement:
        "Ordering pages by when they were created or changed reads those moments from the pages.",
    },
  ],
} as const satisfies Initiative
