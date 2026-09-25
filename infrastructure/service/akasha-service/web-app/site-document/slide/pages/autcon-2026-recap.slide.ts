import type { Slide } from "akasha/infrastructure/service/akasha-service/web-app/site-document/slide/slide.page-type.types.ts"

export const autcon2026Recap = {
  id: "01a0d624-9333-7680-abdf-a426ce3ae1d8",
  type: "page-type/slide",
  slug: "autcon-2026-recap",
  title: "What we talked about",
  deck: "site-document/audhdalan-web-autcon-2026",
  number: 6,
  kind: "agenda",
  points: [
    { title: "Basic Spoon Counting", value: "Level 1", description: "Enough, Not Enough" },
    { title: "Stoplight Measurement", value: "Level 2", description: "Green, Yellow, Red" },
    { title: "Resource Bars", value: "Level 3", description: "Health, Mana, Stamina" },
  ],
  closer: "Plus: Notion + Google Sheets quick-starts at the end.",
} as const satisfies Slide
