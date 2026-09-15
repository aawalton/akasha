import type { cpu } from "akasha/infrastructure/machines/computer/properties/cpu.select-property.ts"

export type Cpu = (typeof cpu.values)[number]
