import type { Secret } from "../secret.page-type.ts"

export const alertmanagerConfigAlertmanagerYml = {
  id: "01a07698-1a84-7190-b819-d6594a3ca5a0",
  pageTypeSlug: "secret",
  slug: "alertmanager-config-alertmanager-yml",
  placements: [{ resourceName: "alertmanager-config", resourceKey: "alertmanager.yml" }],
} as const satisfies Secret
