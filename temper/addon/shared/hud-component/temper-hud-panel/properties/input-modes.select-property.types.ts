import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { inputModes } from "akasha/temper/addon/shared/hud-component/temper-hud-panel/properties/input-modes.select-property.ts"

export type InputModes = List<(typeof inputModes.values)[number]>
