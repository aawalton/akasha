import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const viewTabDeleteConfirm = {
  id: "01a0e34e-db7e-70c4-9944-36ab68441fde",
  type: "page-type/web-phrase",
  slug: "view-tab-delete-confirm",
  title: "Are you sure you want to delete “{name}”? This cannot be undone.",
} as const satisfies WebPhrase
