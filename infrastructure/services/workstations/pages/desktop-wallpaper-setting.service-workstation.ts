import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const desktopWallpaperSetting = {
  id: "01a0786c-047b-7863-b793-0ff93be3d895",
  type: "service-workstation",
  slug: "desktop-wallpaper-setting",
  definition: "the service setting the desktop wallpaper to the persona Alan messaged last",
  enabled: true,
  systemd: {
    restart: "on-failure",
    restartDelaySeconds: 5,
    startLimitIntervalSeconds: 0,
  },
  invariants: [
    {
      invariantKind: "departure",
      statement: "The unit running the watch is simple rather than a timer.",
    },
    {
      invariantKind: "departure",
      statement: "Repeated starts are counted over no window.",
    },
    {
      invariantKind: "departure",
      statement: "A watch failing all night keeps on.",
    },
  ],
} as const satisfies ServiceWorkstation
