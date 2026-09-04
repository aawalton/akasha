import { assertNever } from "@akasha/utils-narrow/assert-never"
import type { PropertyDefinition } from "../../page-data/page-data.module.code.ts"
import { formulaConfigSchema } from "../../schema/property-config-schemas/property-config-schemas.module.code.ts"
import { BOOLEAN_OPS } from "../boolean/boolean.module.code.ts"
import { DATE_OPS } from "../date/date.module.code.ts"
import { textFilterPredicate } from "../filter-utils/filter-utils.module.code.ts"
import { NUMBER_OPS, toNumber } from "../number/number.module.code.ts"
import type {
  FilterConfig,
  FilterOperatorOption,
  PropertyTypeOps,
  PropertyValue,
} from "../property-type-ops/property-type-ops.module.code.ts"

export const FORMULA_OPS: PropertyTypeOps = {
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
        return NUMBER_OPS.getFilterPredicate(config, numberDef)
      }
      case "boolean": {
        const booleanDef: PropertyDefinition = { id, title, type: returnType, config: {} }
        return BOOLEAN_OPS.getFilterPredicate(config, booleanDef)
      }
      case "calendar-date": {
        const dateDef: PropertyDefinition = {
          id,
          title,
          type: "calendar-date",
          config: {},
        }
        return DATE_OPS.getFilterPredicate(config, dateDef)
      }
      case "text":
        return textFilterPredicate(config)
      default:
        assertNever(returnType)
    }
  },
}
