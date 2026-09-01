export const DISPLAY_PARAM = "display"
export const DISPLAY_PROPERTIES = "properties"

export type PageDisplayMode = "page" | "properties"

export function parseDisplayMode(value: string | null | undefined): PageDisplayMode {
  return value === DISPLAY_PROPERTIES ? "properties" : "page"
}

export function buildViewPropertiesHref(pathname: string): string {
  return `${pathname}?${DISPLAY_PARAM}=${DISPLAY_PROPERTIES}`
}
