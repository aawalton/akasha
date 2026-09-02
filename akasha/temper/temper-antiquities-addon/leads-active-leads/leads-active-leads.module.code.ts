import { zoneDisplayName } from "../leads-zone-name/leads-zone-name.module.code.ts"

export function getAntiquityDigZoneName(this: void, antiquityId: number): string | undefined {
  const digZoneId = GetAntiquityZoneId(antiquityId)
  const name = zoneDisplayName(digZoneId)
  return name === "" ? undefined : name
}
