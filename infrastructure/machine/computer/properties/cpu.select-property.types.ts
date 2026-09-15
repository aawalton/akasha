import type { cpu } from "akasha/infrastructure/machine/computer/properties/cpu.select-property.ts"

export type Cpu = (typeof cpu.values)[number]
