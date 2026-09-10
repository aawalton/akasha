import type { Page } from "../../pages/page.page-type.types.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Brand } from "./properties/brand.select-property.types.ts"
import type { ComputerLink } from "./properties/computer-link.url-property.types.ts"
import type { ComputerModel } from "./properties/computer-model.text-property.ts"
import type { ComputerStatus } from "./properties/computer-status.select-property.types.ts"
import type { Cost } from "./properties/cost.number-property.types.ts"
import type { Cpu } from "./properties/cpu.select-property.types.ts"
import type { CpuScore } from "./properties/cpu-score.number-property.types.ts"
import type { Display } from "./properties/display.select-property.types.ts"
import type { DisplayRefreshRate } from "./properties/display-refresh-rate.select-property.types.ts"
import type { DisplayResolution } from "./properties/display-resolution.select-property.types.ts"
import type { FormFactor } from "./properties/form-factor.select-property.types.ts"
import type { Gpu } from "./properties/gpu.select-property.types.ts"
import type { GpuScore } from "./properties/gpu-score.number-property.types.ts"
import type { GpuSize } from "./properties/gpu-size.select-property.types.ts"
import type { Hdd } from "./properties/hdd.number-property.types.ts"
import type { OperatingSystem } from "./properties/operating-system.select-property.types.ts"
import type { PurchaseDate } from "./properties/purchase-date.calendar-date-property.types.ts"
import type { Ram } from "./properties/ram.select-property.types.ts"
import type { Ssd } from "./properties/ssd.number-property.types.ts"

export type Computer = Page & {
  title: Title
  brand?: Brand
  cost?: Cost
  cpuScore: CpuScore
  cpu: Cpu
  displayRefreshRate?: DisplayRefreshRate
  displayResolution?: DisplayResolution
  display?: Display
  formFactor: FormFactor
  gpuScore: GpuScore
  gpuSize?: GpuSize
  gpu: Gpu
  hdd?: Hdd
  link?: ComputerLink
  computerModel?: ComputerModel
  operatingSystem: OperatingSystem
  purchaseDate?: PurchaseDate
  ram: Ram
  ssd: Ssd
  computerStatus: ComputerStatus
}
