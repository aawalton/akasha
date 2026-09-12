import type { PageWithProperties } from "akasha/pages/ui/supabase/page-with-properties/page-with-properties.module.code.ts"

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
