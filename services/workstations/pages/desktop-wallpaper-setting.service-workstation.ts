import type { ServiceWorkstation } from "akasha/services/workstations/service-workstation.page-type.types.ts"

export const desktopWallpaperSetting = {
  id: "01a0786c-047b-7863-b793-0ff93be3d895",
  pageTypeSlug: "service-workstation",
  type: "service-workstation",
  slug: "desktop-wallpaper-setting",
  definition: "the service setting the desktop wallpaper to the persona Alan messaged last",
  runs: ["bun personas/desktop-wallpaper-setting/desktop-wallpaper-setting.module.code.ts"],
  starts: [{ code: "module/desktop-wallpaper-setting" }],
  enabled: true,
  systemd: {
    schedule: "*:0/5",
    catchUp: true,
  },
} as const satisfies ServiceWorkstation
