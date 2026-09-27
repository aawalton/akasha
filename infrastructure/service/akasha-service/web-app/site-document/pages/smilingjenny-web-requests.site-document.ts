import type { SiteDocument } from "akasha/infrastructure/service/akasha-service/web-app/site-document/site-document.page-type.types.ts"

export const smilingjennyWebRequests = {
  id: "01a0e2a7-d06f-72ea-b08b-00073f6454c7",
  type: "page-type/site-document",
  slug: "smilingjenny-web-requests",
  title: "Feature requests",
  webApp: "web-app/smilingjenny-web",
  urlPath: "requests",
  lead: "What has been asked for here, and the contribution points behind each ask.",
  sections: [
    {
      anchor: "unpublished",
      title: "Nothing published",
      text: "Nothing has been published here yet. (live check)",
    },
  ],
} as const satisfies SiteDocument
