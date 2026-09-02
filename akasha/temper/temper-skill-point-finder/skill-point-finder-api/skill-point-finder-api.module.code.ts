import { toggleWindow } from "../skill-point-finder-window/skill-point-finder-window.module.code.ts"

export interface UspfApi {
  ToggleWindow: typeof toggleWindow
}

declare global {
  var USPF: UspfApi | undefined
}

globalThis.USPF = {
  ToggleWindow: toggleWindow,
}
