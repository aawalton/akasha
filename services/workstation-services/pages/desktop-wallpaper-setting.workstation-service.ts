import type { WorkstationService } from "../workstation-service.page-type.types.ts"

export const desktopWallpaperSetting = {
  id: "01a0786c-047b-7863-b793-0ff93be3d895",
  pageTypeSlug: "workstation-service",
  type: "workstation-service",
  slug: "desktop-wallpaper-setting",
  definition: "the service setting the desktop wallpaper to the persona Alan messaged last",
  runs: ["bun personas/desktop-wallpaper-setting/desktop-wallpaper-setting.module.code.ts"],
  enabled: true,
  systemd: {
    schedule: "*:0/5",
    catchUp: true,
  },
} as const satisfies WorkstationService
