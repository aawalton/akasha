import type { NotificationData } from "akasha/temper/addon/pages/hud/temper-notification/modules/notification-types/notification-types.module.code.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export type GlobalTable = Record<string, unknown>

export function asTextureControl(value: unknown): TextureControl {
  return value as TextureControl
}

export function asNotificationData(value: unknown): NotificationData {
  return value as NotificationData
}
