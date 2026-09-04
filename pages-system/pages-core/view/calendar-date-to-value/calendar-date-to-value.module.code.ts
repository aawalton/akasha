import { getEsoDayStr } from "@akasha/day/eso-day"
import type { PropertyDefinition } from "../../page-data/page-data.module.code.ts"
import { instantToMillis } from "../../property-types/instant/instant.module.code.ts"
import type { PropertyValue } from "../../property-types/property-type-ops/property-type-ops.module.code.ts"

export function isCalendarKeyablePropertyType(prop: PropertyDefinition): boolean {
  return prop.type === "calendar-date" || prop.type === "instant"
}

export function isCalendarDraggablePropertyType(prop: PropertyDefinition): boolean {
  return prop.type === "calendar-date"
}

export function calendarDayToPropertyValue(prop: PropertyDefinition, dayStr: string): unknown {
  if (prop.type === "calendar-date") return dayStr
  return undefined
}

export function pageDayKey(
  prop: PropertyDefinition,
  value: PropertyValue | undefined
): string | null {
  if (prop.type === "calendar-date") {
    return typeof value === "string" && value.length > 0 ? value : null
  }
  if (prop.type === "instant") {
    const millis = instantToMillis(value)
    return millis === null ? null : getEsoDayStr(new Date(millis))
  }
  return null
}
