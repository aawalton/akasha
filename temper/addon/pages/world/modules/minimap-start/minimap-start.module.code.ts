import { registerStrings } from "akasha/temper/addon/pages/world/modules/minimap-ui-strings/minimap-ui-strings.module.code.ts"
import "akasha/temper/addon/pages/world/modules/minimap-global/minimap-global.module.code.ts"
import "akasha/temper/addon/pages/world/modules/minimap-core/minimap-core.module.code.ts"
import "akasha/temper/addon/pages/world/modules/minimap-settings/minimap-settings.module.code.ts"

import { holder } from "akasha/temper/addon/pages/world/modules/minimap-holder/minimap-holder.module.code.ts"

registerStrings()

export function initVotansMiniMap(this: void): undefined {
  holder.Initialize()
  holder.InitSettings()
  return undefined
}
