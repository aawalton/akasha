import type { Page } from "akasha/pages/core/page-types/page-types.module.code.ts"

export interface PageWithProperties {
  _id: string
  properties: Record<string, unknown>
}

export function pageById(
  pages: readonly PageWithProperties[],
  id: string
): PageWithProperties | undefined {
  return pages.find((one) => one._id === id)
}

export function toPageWithProperties(props: Page): PageWithProperties {
  const id = typeof props.id === "string" ? props.id : ""
  return {
    _id: id,
    properties: props satisfies Record<string, unknown>,
  }
}
