import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const audhdalan = {
  id: "01a06558-c2cc-7000-8cc9-fca361852367",
  pageTypeSlug: "domain",
  slug: "audhdalan",
  definition: "what Alan publishes about living autistic and ADHD",
  pluralSlug: "audhdalans",
  partSlugs: ["router-app/audhdalan-web", "page-type/audhdalan-subscriber"],
} as const satisfies Domain
