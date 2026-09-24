import type { ControlFields } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-types/potion-types.module.code.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

type ControlWithFields = Control & ControlFields

function asControlWithFields(value: unknown): ControlWithFields {
  return value as ControlWithFields
}

export function asFields(this: void, control: Control): ControlWithFields {
  return asControlWithFields(control)
}
