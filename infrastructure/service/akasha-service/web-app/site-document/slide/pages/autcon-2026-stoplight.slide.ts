import type { Slide } from "akasha/infrastructure/service/akasha-service/web-app/site-document/slide/slide.page-type.types.ts"

export const autcon2026Stoplight = {
  id: "01a0d624-9333-7565-a576-a62e3d1bb8b6",
  type: "page-type/slide",
  slug: "autcon-2026-stoplight",
  title: "Level 2: Stoplight Measurement",
  deck: "site-document/audhdalan-web-autcon-2026",
  number: 4,
  kind: "level",
  lead: "Relative anchors, moving targets",
  points: [
    {
      title: "Green",
      description: "when you are doing better than normal = ~5 days per month",
      color: "green",
    },
    {
      title: "Yellow",
      description: "when you are doing okay = ~20 days per month",
      color: "yellow",
    },
    {
      title: "Red",
      description: "when you are doing worse than normal = ~5 days per month",
      color: "red",
    },
  ],
} as const satisfies Slide
