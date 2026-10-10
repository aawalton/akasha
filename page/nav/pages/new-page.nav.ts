import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const newPage = {
  id: "01a12640-018d-769c-a161-66d8049901ff",
  type: "page-type/nav",
  slug: "new-page",
  title: "New Page",
  icon: "file-text",
  navPlace: 20,
  app: "web-app/alanwalton-web",
  createdAt: "2026-10-10T14:38:11.894Z",
  updatedAt: "2026-10-10T14:38:11.894Z",
} as const satisfies Nav
