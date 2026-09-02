import { registerAddonInit } from "@akasha/temper-addon-init/addon-init"
import type { CaptureDescriptor, PerfSlot } from "@akasha/temper-capture-descriptor/descriptor"
import { finishPerfTrace, startPerfTrace } from "@akasha/temper-capture-perf/perf-trace"
import { makeAccountWideSavedVars } from "../account-wide-vars/account-wide-vars.module.code.ts"

export interface CaptureWriter<T> {
  readonly initializeSavedVariables: (this: void) => T
  readonly getSavedVariables: (this: void) => T
}

export function defineCaptureWriter<T extends object>(
  descriptor: CaptureDescriptor<T>,
  onInitialize?: (this: void, writer: CaptureWriter<T>) => void
): CaptureWriter<T> {
  const accessor = makeAccountWideSavedVars(
    descriptor.savedVariablesName,
    descriptor.version,
    descriptor.defaults
  )

  const writer: CaptureWriter<T> = {
    initializeSavedVariables: accessor.initializeSavedVariables,
    getSavedVariables: accessor.getSavedVariables,
  }

  function initialize(this: void): undefined {
    const perfStart = descriptor.perf === true ? startPerfTrace() : undefined
    accessor.initializeSavedVariables()
    if (onInitialize !== undefined) onInitialize(writer)
    if (perfStart !== undefined) {
      const perfHost: T & PerfSlot = accessor.getSavedVariables()
      perfHost.perf = finishPerfTrace(descriptor.addonName, perfStart)
    }
  }

  registerAddonInit(descriptor.addonName, initialize)
  return writer
}
