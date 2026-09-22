import type { Stylesheet } from "akasha/code/stylesheet/stylesheet.page-type.types.ts"

export const themeBridge = {
  id: "01a05c95-564a-70ee-9a3c-9ed4117a6f44",
  type: "page-type/stylesheet",
  slug: "theme-bridge",
  definition: "the custom properties from which Tailwind builds its own utilities",
  styles: "css",
} as const satisfies Stylesheet
