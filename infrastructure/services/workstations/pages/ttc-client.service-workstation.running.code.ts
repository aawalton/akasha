import { homedir } from "node:os"
import { runBinary } from "akasha/infrastructure/services/workstations/binary-running/binary-running.module.code.ts"

const CLIENT =
  ".steam/steam/steamapps/compatdata/306130/pfx/drive_c/users/steamuser/Documents/Elder Scrolls Online/live/AddOns/TamrielTradeCentre/Client/Client.exe"

const ARGV = ["/usr/bin/protontricks-launch", "--no-term", `${homedir()}/${CLIENT}`]

export async function runService(): Promise<never> {
  return await runBinary(ARGV)
}
