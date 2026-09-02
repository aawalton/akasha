import "../notification-declarations/notification-declarations.module.code.ts"
import { asGlobalTable } from "../notification-casts/notification-casts.module.code.ts"
import { LIB_NAME } from "../notification-names/notification-names.module.code.ts"
import { NOTIFICATION_LIB } from "../notification-provider-link/notification-provider-link.module.code.ts"
import { installOverrides } from "../notification-row-overrides/notification-row-overrides.module.code.ts"
import type { Lib } from "../notification-types/notification-types.module.code.ts"

declare global {
  var LibNotifications: Lib
  var LibNotification: Lib
}

const GLOBALS = asGlobalTable(globalThis)
if (GLOBALS[LIB_NAME] !== undefined) {
  error(`${LIB_NAME} is already loaded`)
}

globalThis.LibNotifications = NOTIFICATION_LIB
globalThis.LibNotification = NOTIFICATION_LIB

installOverrides()
