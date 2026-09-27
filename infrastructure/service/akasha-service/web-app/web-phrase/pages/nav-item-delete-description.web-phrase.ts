import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const navItemDeleteDescription = {
  id: "01a0e34e-db7d-7692-b3e3-778245dee34e",
  type: "page-type/web-phrase",
  slug: "nav-item-delete-description",
  title: "This removes the item from the sidebar. This action cannot be undone.",
} as const satisfies WebPhrase
