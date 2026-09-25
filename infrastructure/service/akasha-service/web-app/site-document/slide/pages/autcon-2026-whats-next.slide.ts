import type { Slide } from "akasha/infrastructure/service/akasha-service/web-app/site-document/slide/slide.page-type.types.ts"

export const autcon2026WhatsNext = {
  id: "01a0d624-9333-752b-ae69-993ae3dd0eec",
  type: "page-type/slide",
  slug: "autcon-2026-whats-next",
  title: "What's next",
  deck: "site-document/audhdalan-web-autcon-2026",
  number: 7,
  kind: "cta",
  points: [
    {
      title: "Templates at audhdalan.com",
      description: "Notion + Google Sheets — starter scaffolds at all three levels",
    },
    { title: "Stay in Touch", description: "alan@audhdalan.com" },
  ],
  imageCaption: "audhdalan.com",
} as const satisfies Slide
