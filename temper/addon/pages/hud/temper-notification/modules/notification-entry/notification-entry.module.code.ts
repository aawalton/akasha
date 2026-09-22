import type { GlobalTable } from "akasha/temper/addon/pages/hud/temper-notification/modules/notification-casts/notification-casts.module.code.ts"

import { NOTIFICATION_GLOBAL } from "akasha/temper/addon/pages/hud/temper-notification/modules/notification-names/notification-names.module.code.ts"
import { NOTIFICATION_API } from "akasha/temper/addon/pages/hud/temper-notification/modules/notification-provider-link/notification-provider-link.module.code.ts"
import { installOverrides } from "akasha/temper/addon/pages/hud/temper-notification/modules/notification-row-overrides/notification-row-overrides.module.code.ts"

const GLOBALS = globalThis as GlobalTable

GLOBALS[NOTIFICATION_GLOBAL] = NOTIFICATION_API

installOverrides()
