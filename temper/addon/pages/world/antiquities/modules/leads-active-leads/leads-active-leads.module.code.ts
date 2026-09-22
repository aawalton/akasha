import { zoneDisplayName } from "akasha/temper/addon/pages/world/antiquities/modules/leads-zone-name/leads-zone-name.module.code.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"

export function getAntiquityDigZoneName(this: void, antiquityId: number): string | undefined {
  const digZoneId = GetAntiquityZoneId(antiquityId)
  const name = zoneDisplayName(digZoneId)
  return name === "" ? undefined : name
}
