import type { Initiative } from "../initiative.page-type.types.ts"

export const dallaDeployCleanup = {
  id: "01a08cd4-2398-7e2b-8600-bc6002b41fe7",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "dalla-deploy-cleanup",
  domain: "page-type/change",
  persona: "dalla",
  intents: [
    { statement: "Every workstation service has deployed through `akasha deploy`." },
    { statement: "Every cluster service has deployed through `akasha deploy`." },
    { statement: "Every ios app has deployed through `akasha deploy`." },
    { statement: "No competing akasha build or deploy command exists." },
  ],
} as const satisfies Initiative
