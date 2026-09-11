import type { equipmentConfiguration } from "akasha/alan/values/health/fitness/equipment-items/properties/equipment-configuration.select-property.ts"

export type EquipmentConfiguration = (typeof equipmentConfiguration.values)[number]
