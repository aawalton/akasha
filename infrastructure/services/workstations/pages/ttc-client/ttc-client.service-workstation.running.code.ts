import { homedir } from "node:os"
import { runBinary } from "akasha/infrastructure/services/workstations/modules/binary-running/binary-running.module.code.ts"

const CLIENT =
  ".steam/steam/steamapps/compatdata/306130/pfx/drive_c/users/steamuser/Documents/Elder Scrolls Online/live/AddOns/TamrielTradeCentre/Client/Client.exe"

const ARGV = [
  "/usr/bin/protontricks-launch",
  "--no-term",
  "--appid",
  "306130",
  `${homedir()}/${CLIENT}`,
  "Silent",
]

export async function runService(): Promise<never> {
  return await runBinary(ARGV)
}
