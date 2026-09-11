import type { cpu } from "akasha/machines/computers/properties/cpu.select-property.ts"

export type Cpu = (typeof cpu.values)[number]
