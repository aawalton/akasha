import { assertNever } from "../../../utils-narrow/src/assert-never.ts"
import { formulaConfigSchema } from "../schema/property-config-schemas.ts"
import type { PropertyDefinition } from "../types.ts"
import { booleanOps } from "./boolean.ts"
import { dateOps } from "./date.ts"
import { textFilterPredicate } from "./filter-utils.ts"
import { numberOps, toNumber } from "./number.ts"
import type { FilterConfig, FilterOperatorOption, PropertyTypeOps, PropertyValue } from "./types.ts"

export const formulaOps: PropertyTypeOps = {
  validate() {
    return null
  },

  getSortValue(value: PropertyValue) {
    if (value === null || value === undefined) return null
    const n = toNumber(value)
    if (n !== null) return n
    return String(value)
  },

  getFilterOperators(): readonly FilterOperatorOption[] {
    return [
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ]
  },

  getFilterPredicate(config: FilterConfig, definition: PropertyDefinition) {
    const parsed = formulaConfigSchema.safeParse(definition?.config)
    const returnType = parsed.success ? parsed.data.returnType : "text"

    const id = definition?.id ?? "formula"
    const title = definition?.title ?? "Formula"
    switch (returnType) {
      case "number": {
        const numberDef: PropertyDefinition = { id, title, type: "number", config: {} }
        return numberOps.getFilterPredicate(config, numberDef)
      }
      case "boolean": {
        const booleanDef: PropertyDefinition = { id, title, type: returnType, config: {} }
        return booleanOps.getFilterPredicate(config, booleanDef)
      }
      case "calendar-date": {
        const dateDef: PropertyDefinition = {
          id,
          title,
          type: "calendar-date",
          config: {},
        }
        return dateOps.getFilterPredicate(config, dateDef)
      }
      case "text":
        return textFilterPredicate(config)
      default:
        assertNever(returnType)
    }
  },
}
