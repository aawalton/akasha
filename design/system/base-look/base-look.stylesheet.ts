import type { Stylesheet } from "akasha/code-system/stylesheets/stylesheet.page-type.types.ts"

export const baseLook = {
  id: "01a05c95-564a-7211-b73d-5e0602df9891",
  pageTypeSlug: "stylesheet",
  type: "stylesheet",
  slug: "base-look",
  definition: "how the page body, the chrome around it and its scrollbars are dressed",
  styles: "css",
} as const satisfies Stylesheet
