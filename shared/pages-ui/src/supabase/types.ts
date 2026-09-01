import type { Page } from "@akasha/pages-core/page-types"

export interface PageWithProperties {
  _id: string
  properties: Record<string, unknown>
}

export function toPageWithProperties(props: Page): PageWithProperties {
  const id = typeof props.id === "string" ? props.id : ""
  return {
    _id: id,
    properties: props satisfies Record<string, unknown>,
  }
}
