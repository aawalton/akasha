export const DISPLAY_PARAM = "display"
const DISPLAY_PROPERTIES = "properties"

export type PageDisplayMode = "page" | "properties"

export function parseDisplayMode(value: string | null | undefined): PageDisplayMode {
  return value === DISPLAY_PROPERTIES ? "properties" : "page"
}
