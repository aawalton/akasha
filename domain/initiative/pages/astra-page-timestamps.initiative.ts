import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const astraPageTimestamps = {
  id: "01a11bf1-2669-7cd3-a8ba-fb83ab35ca21",
  type: "page-type/initiative",
  slug: "astra-page-timestamps",
  domain: "page-type/page",
  persona: "persona/astra",
  intentStack: [
    {
      statement:
        "Every page states the moment it was created and the moment its values last changed.",
    },
  ],
  updatedAt: "2026-10-08T16:19:04.190Z",
  createdAt: "2026-10-08T14:35:51.273Z",
} as const satisfies Initiative
