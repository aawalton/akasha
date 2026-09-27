import type { SiteDocument } from "akasha/infrastructure/service/akasha-service/web-app/site-document/site-document.page-type.types.ts"

export const innworldWebHome = {
  id: "01a0e2a3-3183-77cc-81de-a381d7fcec70",
  type: "page-type/site-document",
  slug: "innworld-web-home",
  title: "Innworld",
  description: "A fan wiki of The Wandering Inn, whose characters and world belong to pirateaba.",
  webApp: "web-app/innworld-web",
  urlPath: "",
  sections: [
    {
      anchor: "attribution",
      title: "Attribution",
      text: "A fan wiki of The Wandering Inn, whose characters and world belong to [pirateaba](https://wanderinginn.com).",
    },
  ],
} as const satisfies SiteDocument
