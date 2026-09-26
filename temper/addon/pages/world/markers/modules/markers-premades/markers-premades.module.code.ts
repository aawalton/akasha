import { PREMADES_00 } from "akasha/temper/addon/pages/world/markers/modules/markers-premades-00/markers-premades-00.module.code.ts"
import { PREMADES_01 } from "akasha/temper/addon/pages/world/markers/modules/markers-premades-01/markers-premades-01.module.code.ts"
import { PREMADES_02 } from "akasha/temper/addon/pages/world/markers/modules/markers-premades-02/markers-premades-02.module.code.ts"
import { MM } from "akasha/temper/addon/pages/world/markers/modules/markers-state/markers-state.module.code.ts"

export const LATEST_PRESET_VERSION = 7

export function insertPremades(this: void, dontOverwrite?: boolean): undefined {
  for (const part of [PREMADES_00, PREMADES_01, PREMADES_02]) {
    for (const [zone, name, pieces] of part) {
      let profiles = MM.vars.Profiles[zone]
      if (profiles === undefined) {
        profiles = {}
        MM.vars.Profiles[zone] = profiles
      }
      if (!(dontOverwrite === true && profiles[name] !== undefined)) {
        profiles[name] = [...pieces]
      }
    }
  }
  return undefined
}
