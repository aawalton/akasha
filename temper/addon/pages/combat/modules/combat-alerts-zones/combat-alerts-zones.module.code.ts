import type { ZoneRegistration } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

export const ZONE_REGISTERS: Record<number, ZoneRegistration> = {}

export const ZONE_UNREGISTERS: Record<number, ZoneRegistration> = {}

export function registerZone(
  this: void,
  zoneId: number,
  register: ZoneRegistration,
  unregister: ZoneRegistration
): undefined {
  ZONE_REGISTERS[zoneId] = register
  ZONE_UNREGISTERS[zoneId] = unregister
}
