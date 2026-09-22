import { UNKNOWN } from "akasha/temper/addon/pages/world/antiquities/modules/leads-location-types/leads-location-types.module.code.ts"
import { LOCATIONS } from "akasha/temper/addon/pages/world/antiquities/modules/leads-locations/leads-locations.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/world/antiquities/leads-window-declarations/leads-window-declarations.type-declaration.d.ts"

let lastAntiquityFound = 0

export function getLastAntiquityFound(): number {
  return lastAntiquityFound
}

export function antiquityFound(this: void, _eventCode: number, antiquityId: number): undefined {
  lastAntiquityFound = antiquityId
  const entry = LOCATIONS[antiquityId]
  TemperLeadsLocationBox.SetText(entry !== undefined ? entry.description : UNKNOWN)
}
