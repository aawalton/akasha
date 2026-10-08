import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const designInterfaceBadge = {
  id: "01a05b55-a539-766c-98d3-a4d3e2fc6c4b",
  type: "page-type/domain",
  slug: "design-interface-badge",
  definition: "how a short value is shown in a browser",
  parts: [
    "module/badge",
    "module/badge-layout-context",
    "module/badge-toggle-group",
    "module/button-badge",
    "module/checkbox-badge",
    "module/color-badge-variant",
    "module/date-badge",
    "module/empty-badge",
    "module/input-badge",
    "module/link-badge",
    "module/number-badge",
    "module/time-badge",
    "module/url-badge",
  ],
  createdAt: "2026-09-01T04:58:54.649Z",
  updatedAt: "2026-09-25T14:40:06.000Z",
} as const satisfies Domain
