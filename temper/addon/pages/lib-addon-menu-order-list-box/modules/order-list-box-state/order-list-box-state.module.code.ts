import "akasha/temper/addon/pages/lib-addon-menu-order-list-box/order-list-box-lam-shapes/order-list-box-lam-shapes.type-declaration.d.ts"
import "akasha/temper/addon/pages/lib-addon-menu-order-list-box/order-list-box-shape/order-list-box-shape.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/addon/type/lib-addon-menu/lib-addon-menu.type-declaration.d.ts"

export const em = EVENT_MANAGER
export const wm = WINDOW_MANAGER
export const cm = CALLBACK_MANAGER

export const LAM = LibAddonMenu2
export const util = LAM.util

export const getStringFromValue = util.GetStringFromValue
export const getDefaultValue = util.GetDefaultValue

export const STATE: {
  cursorTLC: LamCursorTLC | undefined
  cursorTLCLabel: LabelControl | undefined
  orderListBoxCounter: number
} = {
  cursorTLC: undefined,
  cursorTLCLabel: undefined,
  orderListBoxCounter: 0,
}
