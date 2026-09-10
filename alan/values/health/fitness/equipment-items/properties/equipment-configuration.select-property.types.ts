import type { equipmentConfiguration } from "./equipment-configuration.select-property.ts"

export type EquipmentConfiguration = (typeof equipmentConfiguration.values)[number]
