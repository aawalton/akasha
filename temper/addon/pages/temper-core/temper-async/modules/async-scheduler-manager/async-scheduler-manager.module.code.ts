import { ADDON_NAME } from "akasha/temper/addon/pages/temper-core/modules/hud-addon-names/hud-addon-names.module.code.ts"
import {
  ASYNC_GLOBAL,
  INIT_DELAY_MS,
} from "akasha/temper/addon/pages/temper-core/temper-async/modules/async-constants/async-constants.module.code.ts"
import { initSavedVar } from "akasha/temper/addon/pages/temper-core/temper-async/modules/async-saved-vars/async-saved-vars.module.code.ts"
import { doMeasure } from "akasha/temper/addon/pages/temper-core/temper-async/modules/async-scheduler/async-scheduler.module.code.ts"
import {
  EM,
  lib,
} from "akasha/temper/addon/pages/temper-core/temper-async/modules/async-state/async-state.module.code.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

interface SchedulerManagerState {
  schedulerId: string | undefined
  measureId: string | undefined
  initId: string | undefined
}

const SM: SchedulerManagerState = {
  schedulerId: undefined,
  measureId: undefined,
  initId: undefined,
}

function stopScheduler(this: void): undefined {
  if (SM.schedulerId !== undefined) {
    EM.UnregisterForUpdate(SM.schedulerId)
    SM.schedulerId = undefined
  }
  if (SM.measureId !== undefined) {
    EM.UnregisterForUpdate(SM.measureId)
    SM.measureId = undefined
  }
}

function startScheduler(this: void): undefined {
  stopScheduler()
  SM.measureId = "AsyncSchedulerMeasure"
  EM.RegisterForUpdate(SM.measureId, 100, doMeasure)
  SM.schedulerId = "AsyncScheduler"
  EM.RegisterForUpdate(SM.schedulerId, 0, lib.Scheduler)
}

function initialize(this: void, delay?: number): undefined {
  if (SM.initId !== undefined) {
    EM.UnregisterForUpdate(SM.initId)
  }
  SM.initId = "AsyncInit"
  EM.RegisterForUpdate(SM.initId, delay ?? INIT_DELAY_MS, (): undefined => {
    if (SM.initId !== undefined) {
      EM.UnregisterForUpdate(SM.initId)
    }
    SM.initId = undefined
    startScheduler()
  })
}

const IDENTIFIER = "ASYNCTASKS_JOBS"

EM.RegisterForEvent(IDENTIFIER, EVENT_PLAYER_ACTIVATED, (): undefined => {
  EM.UnregisterForEvent(IDENTIFIER, EVENT_PLAYER_ACTIVATED)
  initialize()
})

SLASH_COMMANDS["/async"] = (command: string): undefined => {
  lib.Slash(command)
}

startScheduler()

function onAddonLoaded(this: void, _event: number, name: string): undefined {
  if (name !== ADDON_NAME) {
    return
  }
  EM.UnregisterForEvent(ASYNC_GLOBAL, EVENT_ADD_ON_LOADED)
  initSavedVar()
}

EM.RegisterForEvent(ASYNC_GLOBAL, EVENT_ADD_ON_LOADED, onAddonLoaded)
