import "@akasha/temper-eso-types/eso-api"

import { SAVED_VARIABLES_NAME } from "../next-boss-constants/next-boss-constants.module.code.ts"
import { ICT, type IctSavedVariables } from "../next-boss-state/next-boss-state.module.code.ts"

const DEFAULTS: IctSavedVariables = {
  timetable: true,
  timetableTop: 0,
  timetableLeft: 0,
  eventtimers: false,
  maptimers: true,
  chatdebug: false,
  ccw_cw: false,
  saved_timers: {},
}

export function initializeSavedVariables(this: void): undefined {
  ICT.savedVariables = ZO_SavedVars.NewAccountWide<IctSavedVariables>(
    SAVED_VARIABLES_NAME,
    1,
    undefined,
    DEFAULTS
  )
  return undefined
}
