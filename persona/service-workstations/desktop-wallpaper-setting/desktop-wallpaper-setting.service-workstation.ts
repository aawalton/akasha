import type { ServiceWorkstation } from "akasha/infrastructure/service/akasha-service/service-workstation/service-workstation.page-type.types.ts"

export const desktopWallpaperSetting = {
  id: "01a0786c-047b-7863-b793-0ff93be3d895",
  type: "page-type/service-workstation",
  slug: "desktop-wallpaper-setting",
  definition: "the service setting the desktop wallpaper to the persona Alan messaged last",
  enabled: true,
  systemd: {
    restart: "on-failure",
    restartDelaySeconds: 5,
    startLimitIntervalSeconds: 0,
  },
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The unit running the watch is simple rather than a timer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Repeated starts are counted over no window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A watch failing all night keeps on.",
    },
  ],
} as const satisfies ServiceWorkstation
