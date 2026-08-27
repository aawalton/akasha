import type { PageWithProperties } from "./types"

export function composeContentTierPage(
  onDemandPage: PageWithProperties | null,
  mirrorPage: PageWithProperties | null
): PageWithProperties | null {
  if (onDemandPage === null) return mirrorPage
  if (mirrorPage === null) return onDemandPage
  return {
    ...mirrorPage,
    properties: { ...onDemandPage.properties, ...mirrorPage.properties },
  }
}
