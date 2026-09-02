import type { HudField } from "../hud-addon-types/hud-addon-types.module.code.ts"

export interface FieldRegistry {
  register: (this: void, field: HudField) => undefined
  list: (this: void) => readonly HudField[]
}

export function createFieldRegistry(): FieldRegistry {
  const fields: HudField[] = []

  function register(field: HudField): undefined {
    const existing = fields.findIndex((held) => held.id === field.id)
    if (existing >= 0) {
      fields[existing] = field
      return
    }
    fields.push(field)
  }

  function list(): readonly HudField[] {
    return fields
      .map((field, index) => ({ field, index }))
      .sort((left, right) =>
        left.field.order === right.field.order
          ? left.index - right.index
          : left.field.order - right.field.order
      )
      .map((entry) => entry.field)
  }

  return { register, list }
}
