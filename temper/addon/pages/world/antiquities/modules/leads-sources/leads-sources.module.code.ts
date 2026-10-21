import {
  LOCDATA_TYPE_ANTIQUEMAP,
  LOCDATA_TYPE_EXCAVATIONREWARD,
  LOCDATA_TYPE_STARTER,
} from "akasha/temper/addon/pages/world/antiquities/modules/leads-location-types/leads-location-types.module.code.ts"
import { LOCATIONS } from "akasha/temper/addon/pages/world/antiquities/modules/leads-locations/leads-locations.module.code.ts"
import "akasha/temper/eso/type/eso-api-4/eso-api-4.type-declaration.d.ts"

interface AntiquityLeadSource {
  readonly kind: "scry" | "dig" | "buy"
  readonly parentId: number | undefined
}

function locationTypeOf(this: void, antiquityId: number): string | undefined {
  return LOCATIONS[antiquityId]?.type
}

function excavationParentOf(this: void, antiquityId: number): number | undefined {
  const previous = locationTypeOf(antiquityId - 1)
  if (previous === LOCDATA_TYPE_STARTER) return antiquityId - 1
  if (
    previous === LOCDATA_TYPE_EXCAVATIONREWARD &&
    locationTypeOf(antiquityId - 2) === LOCDATA_TYPE_STARTER
  ) {
    return antiquityId - 1
  }
  return undefined
}

export function getAntiquityLeadSource(
  this: void,
  antiquityId: number
): AntiquityLeadSource | undefined {
  const type = locationTypeOf(antiquityId)
  if (type === LOCDATA_TYPE_STARTER || DoesAntiquityRequireLead(antiquityId) === false) {
    return { kind: "scry", parentId: undefined }
  }
  if (type === LOCDATA_TYPE_ANTIQUEMAP) return { kind: "buy", parentId: undefined }
  if (type === LOCDATA_TYPE_EXCAVATIONREWARD) {
    return { kind: "dig", parentId: excavationParentOf(antiquityId) }
  }
  return undefined
}
