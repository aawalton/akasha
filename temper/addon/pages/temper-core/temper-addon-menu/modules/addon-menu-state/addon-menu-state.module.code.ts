import { asLam } from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-casts/addon-menu-casts.module.code.ts"
import type {
  AddonListData,
  Lam,
  Lamcc,
  LamWidgetData,
} from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-types/addon-menu-types.module.code.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export const wm = WINDOW_MANAGER
export const em = EVENT_MANAGER
export const sm = SCENE_MANAGER
export const cm = CALLBACK_MANAGER

export const lam: Lam = asLam({
  widgets: {},
  util: {},
  controlsForReload: [],
})

const widgets = lam.widgets
export const controlsForReload = lam.controlsForReload

export const TEMPER_ADDON_MENU_CREATE_CONTROL: Lamcc = { scrollCount: 0 }

export const ADDONS_FOR_LIST: AddonListData[] = []
export const ADDON_TO_OPTIONS_MAP: Record<string, LamWidgetData[]> = {}
export const OPTIONS_STATE: Record<string, number> = {}

export function registerWidget(this: void, widgetType: string, widgetVersion: number): boolean {
  const existing = widgets[widgetType]
  if (existing !== undefined && existing >= widgetVersion) {
    return false
  }
  widgets[widgetType] = widgetVersion
  return true
}

function registerWidgetMethod(this: Lam, widgetType: string, widgetVersion: number): boolean {
  return registerWidget(widgetType, widgetVersion)
}
lam.RegisterWidget = registerWidgetMethod
