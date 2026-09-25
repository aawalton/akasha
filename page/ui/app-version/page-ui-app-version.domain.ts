import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageUiAppVersion = {
  id: "01a071ce-f0cf-7b67-870b-8e95b49f98bf",
  type: "page-type/domain",
  slug: "page-ui-app-version",
  definition: "the version of the program a browser runs",
  parts: ["module/app-version-check", "module/use-app-version-check"],
} as const satisfies Domain
