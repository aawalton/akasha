import type { Nav } from "akasha/page/nav/nav.page-type.types.ts"

export const temperKeyboardShortcuts = {
  id: "01a0d910-e122-7b85-9bc3-a154d1dd0124",
  type: "page-type/nav",
  slug: "temper-keyboard-shortcuts",
  title: "Keyboard Shortcuts",
  icon: "keyboard",
  navPlace: 2,
  app: "web-app/temper-web",
  navParent: "nav/temper-resources",
  navHref: "/keyboard-shortcuts",
} as const satisfies Nav
