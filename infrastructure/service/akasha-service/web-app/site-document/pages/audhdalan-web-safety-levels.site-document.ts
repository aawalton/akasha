import type { SiteDocument } from "akasha/infrastructure/service/akasha-service/web-app/site-document/site-document.page-type.types.ts"

export const audhdalanWebSafetyLevels = {
  id: "01a0d5bc-524c-7482-98e0-5f12f27af144",
  type: "page-type/site-document",
  slug: "audhdalan-web-safety-levels",
  title: "Safety Levels",
  webApp: "web-app/audhdalan-web",
  urlPath: "safety-levels",
  sections: [
    {
      anchor: "levels",
      title: "Levels",
      text: "| Level | Anchor | Activities |\n| --- | --- | --- |\n| 5 | Can be outgoing | Initiating conversations, paying active attention to others, caring about others |\n| 4 | Can be secure | Conflict, singing, dancing, being perceived |\n| 3 | Can feel happiness | Being social, nature, food, music, aesthetic experiences |\n| 2 | Can be productive | Programming, projects, chores |\n| 1 | Can rest | Reading fiction, watching shows, playing games |\n| 0 | Can tolerate existing | Can lie down in a dark room and count |\n| -1 | Sympathetic dominance | Fight, flight, freeze, fawn |\n| -2 | Parasympathetic flop | Flop, complete physical systems shutdown |",
    },
  ],
} as const satisfies SiteDocument
