import type { WorkstationService } from "../workstation-service.page-type.ts"

export const ttcClient = {
  id: "01a06829-0194-7e8a-b87b-1e6e9ea4fe59",
  pageTypeSlug: "workstation-service",
  slug: "ttc-client",
  definition: "the service keeping Tamriel Trade Centre prices current inside the game's prefix",
  runs: [
    '/usr/bin/protontricks-launch --no-term "%h/.steam/steam/steamapps/compatdata/306130/pfx/drive_c/users/steamuser/Documents/Elder Scrolls Online/live/AddOns/TamrielTradeCentre/Client/Client.exe"',
  ],
  enabled: true,
  needsSecrets: false,
  systemd: {
    after: ["graphical-session.target"],
    partOf: "graphical-session.target",
    wantedBy: "graphical-session.target",
    restart: "on-failure",
    restartDelaySeconds: 10,
  },
} as const satisfies WorkstationService
