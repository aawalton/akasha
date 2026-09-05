import type { Domain } from "@akasha/domains/domain"

export const pagesUiAppVersion = {
  id: "01a071ce-f0cf-7b67-870b-8e95b49f98bf",
  pageTypeSlug: "domain",
  slug: "pages-ui-app-version",
  definition: "which build of the app is running",
  partSlugs: ["module/app-version-check", "module/use-app-version-check"],
} as const satisfies Domain
