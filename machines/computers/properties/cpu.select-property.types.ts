import type { cpu } from "./cpu.select-property.ts"

export type Cpu = (typeof cpu.values)[number]
