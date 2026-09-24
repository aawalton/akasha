import type { SiteDocument } from "akasha/infrastructure/service/akasha-service/web-app/site-document/site-document.page-type.types.ts"

export const audhdalanWebHome = {
  id: "01a0d5bc-524c-7600-b23f-a485d30f8c96",
  type: "page-type/site-document",
  slug: "audhdalan-web-home",
  title: "AuDHD Alan",
  webApp: "web-app/audhdalan-web",
  urlPath: "",
  sections: [
    {
      anchor: "about-alan",
      title: "About Alan",
      text: "I've spent 20+ years building measurement systems — and most of those years in undiagnosed autistic burnout. Self-diagnosed AuDHD at 38, after 18 years in tech. Six months later I started recovery, and I'm 18 months in.",
    },
    {
      anchor: "resources",
      title: "Resources",
      text: "- [AutCon 2026 — Making Every Spoon Count](/autcon-2026)\\\n  Three mental models for tracking autistic energy, simple to instrumented.\n- [Safety Levels](/safety-levels)\\\n  The 8-row anchor table for Alan's Safety scale.\n- [Google Sheets template](https://docs.google.com/spreadsheets/d/1KR1xMg8LbwwHiSfS8-2eSrb0t4xKVgn0kgnfuvz4zuY/)\\\n  Starter scaffolds at all three levels — Spoon Counting, Stoplight, Resource Bars.\n- [Notion template](https://cool-crocus-712.notion.site/Making-Every-Spoon-Count-Templates-3605cf0bf24a808a9ae6fb09aa0af644)\\\n  Starter scaffolds at all three levels — Spoon Counting, Stoplight, Resource Bars.",
    },
  ],
} as const satisfies SiteDocument
