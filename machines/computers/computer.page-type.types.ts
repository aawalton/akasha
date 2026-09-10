import type { Page } from "../../pages/page.page-type.types.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Brand } from "./properties/brand.select-property.ts"
import type { ComputerLink } from "./properties/computer-link.url-property.ts"
import type { ComputerModel } from "./properties/computer-model.text-property.ts"
import type { ComputerStatus } from "./properties/computer-status.select-property.ts"
import type { Cost } from "./properties/cost.number-property.ts"
import type { Cpu } from "./properties/cpu.select-property.ts"
import type { CpuScore } from "./properties/cpu-score.number-property.ts"
import type { Display } from "./properties/display.select-property.ts"
import type { DisplayRefreshRate } from "./properties/display-refresh-rate.select-property.ts"
import type { DisplayResolution } from "./properties/display-resolution.select-property.ts"
import type { FormFactor } from "./properties/form-factor.select-property.ts"
import type { Gpu } from "./properties/gpu.select-property.ts"
import type { GpuScore } from "./properties/gpu-score.number-property.ts"
import type { GpuSize } from "./properties/gpu-size.select-property.ts"
import type { Hdd } from "./properties/hdd.number-property.ts"
import type { OperatingSystem } from "./properties/operating-system.select-property.ts"
import type { PurchaseDate } from "./properties/purchase-date.calendar-date-property.ts"
import type { Ram } from "./properties/ram.select-property.ts"
import type { Ssd } from "./properties/ssd.number-property.ts"

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
