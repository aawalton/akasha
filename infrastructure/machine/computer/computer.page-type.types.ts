import type { Brand } from "akasha/infrastructure/machine/computer/properties/brand.select-property.types.ts"
import type { ComputerLink } from "akasha/infrastructure/machine/computer/properties/computer-link.url-property.types.ts"
import type { ComputerModel } from "akasha/infrastructure/machine/computer/properties/computer-model.text-property.types.ts"
import type { ComputerStatus } from "akasha/infrastructure/machine/computer/properties/computer-status.select-property.types.ts"
import type { Cost } from "akasha/infrastructure/machine/computer/properties/cost.number-property.types.ts"
import type { Cpu } from "akasha/infrastructure/machine/computer/properties/cpu.select-property.types.ts"
import type { CpuScore } from "akasha/infrastructure/machine/computer/properties/cpu-score.number-property.types.ts"
import type { Display } from "akasha/infrastructure/machine/computer/properties/display.select-property.types.ts"
import type { DisplayRefreshRate } from "akasha/infrastructure/machine/computer/properties/display-refresh-rate.select-property.types.ts"
import type { DisplayResolution } from "akasha/infrastructure/machine/computer/properties/display-resolution.select-property.types.ts"
import type { FormFactor } from "akasha/infrastructure/machine/computer/properties/form-factor.select-property.types.ts"
import type { Gpu } from "akasha/infrastructure/machine/computer/properties/gpu.select-property.types.ts"
import type { GpuScore } from "akasha/infrastructure/machine/computer/properties/gpu-score.number-property.types.ts"
import type { GpuSize } from "akasha/infrastructure/machine/computer/properties/gpu-size.select-property.types.ts"
import type { Hdd } from "akasha/infrastructure/machine/computer/properties/hdd.number-property.types.ts"
import type { OperatingSystem } from "akasha/infrastructure/machine/computer/properties/operating-system.select-property.types.ts"
import type { PurchaseDate } from "akasha/infrastructure/machine/computer/properties/purchase-date.calendar-date-property.types.ts"
import type { Ram } from "akasha/infrastructure/machine/computer/properties/ram.select-property.types.ts"
import type { Ssd } from "akasha/infrastructure/machine/computer/properties/ssd.number-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

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
