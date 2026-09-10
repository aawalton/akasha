import type { Stylesheet } from "akasha/code-system/stylesheets/stylesheet.page-type.types.ts"

export const chessBoardLook = {
  id: "01a05bb1-0c05-7867-849f-69a9d3e51f45",
  pageTypeSlug: "stylesheet",
  type: "stylesheet",
  slug: "chess-board-look",
  definition: "how a chess board and its evaluation bar are dressed in a browser",
  styles: "css",
} as const satisfies Stylesheet
