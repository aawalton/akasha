import { houseTravel } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-state/housing-state.module.code.ts"
import { styleControlsUnder } from "akasha/temper/window/modules/window-controls/window-controls.module.code.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

interface BodyNode {
  control?: Control
}

function asBodyNode(value: unknown): BodyNode {
  return value as BodyNode
}

export function styleHousingControls(this: void): undefined {
  const body = asBodyNode(houseTravel.controls.body).control
  if (body !== undefined) styleControlsUnder(body)
  return undefined
}
