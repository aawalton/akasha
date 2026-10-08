import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageUiComponentQuickAdd = {
  id: "01a071d3-63bd-7123-8d21-2d607ec892bb",
  type: "page-type/domain",
  slug: "page-ui-component-quick-add",
  definition: "how a person makes a page from a short text",
  parts: [
    "module/compute-quick-add-payload",
    "module/parse-inline-tokens",
    "module/use-active-quick-add-page-type",
    "module/use-inline-completion",
  ],
  createdAt: "2026-09-05T13:47:54.173Z",
  updatedAt: "2026-09-25T17:31:09.000Z",
} as const satisfies Domain
