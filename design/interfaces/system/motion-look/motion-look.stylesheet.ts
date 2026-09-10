import type { Stylesheet } from "akasha/code-system/stylesheets/stylesheet.page-type.types.ts"

export const motionLook = {
  id: "01a05c95-564a-7f17-9dee-cd1d1e4f129d",
  pageTypeSlug: "stylesheet",
  type: "stylesheet",
  slug: "motion-look",
  definition: "the keyframes a thing moves by and the classes that run them",
  styles: "css",
} as const satisfies Stylesheet
