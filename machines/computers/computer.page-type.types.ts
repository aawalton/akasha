import type { Brand } from "akasha/machines/computers/properties/brand.select-property.types.ts"
import type { ComputerLink } from "akasha/machines/computers/properties/computer-link.url-property.types.ts"
import type { ComputerModel } from "akasha/machines/computers/properties/computer-model.text-property.ts"
import type { ComputerStatus } from "akasha/machines/computers/properties/computer-status.select-property.types.ts"
import type { Cost } from "akasha/machines/computers/properties/cost.number-property.types.ts"
import type { Cpu } from "akasha/machines/computers/properties/cpu.select-property.types.ts"
import type { CpuScore } from "akasha/machines/computers/properties/cpu-score.number-property.types.ts"
import type { Display } from "akasha/machines/computers/properties/display.select-property.types.ts"
import type { DisplayRefreshRate } from "akasha/machines/computers/properties/display-refresh-rate.select-property.types.ts"
import type { DisplayResolution } from "akasha/machines/computers/properties/display-resolution.select-property.types.ts"
import type { FormFactor } from "akasha/machines/computers/properties/form-factor.select-property.types.ts"
import type { Gpu } from "akasha/machines/computers/properties/gpu.select-property.types.ts"
import type { GpuScore } from "akasha/machines/computers/properties/gpu-score.number-property.types.ts"
import type { GpuSize } from "akasha/machines/computers/properties/gpu-size.select-property.types.ts"
import type { Hdd } from "akasha/machines/computers/properties/hdd.number-property.types.ts"
import type { OperatingSystem } from "akasha/machines/computers/properties/operating-system.select-property.types.ts"
import type { PurchaseDate } from "akasha/machines/computers/properties/purchase-date.calendar-date-property.types.ts"
import type { Ram } from "akasha/machines/computers/properties/ram.select-property.types.ts"
import type { Ssd } from "akasha/machines/computers/properties/ssd.number-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

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
