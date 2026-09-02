import type { Stylesheet } from "@akasha/code-system/stylesheet"

export const themeBridge = {
  id: "01a05c95-564a-70ee-9a3c-9ed4117a6f44",
  pageTypeSlug: "stylesheet",
  slug: "theme-bridge",
  definition: "the custom properties Tailwind builds its own utilities from",
  styles: "css",
} as const satisfies Stylesheet
