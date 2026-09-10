import type { PageType } from "@akasha/pages/page-type"
import type { Page } from "akasha/pages/page.page-type.types.ts"
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

export const computer = {
  id: "01a0658c-329a-7d00-b3f3-8abf47bf46cf",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "computer",
  definition: "one machine Alan owns, and what it is worth running",
  pluralSlug: "computers",
  extends: ["page-type/page"],
  parts: [
    "calendar-date-property/purchase-date",
    "number-property/cost",
    "number-property/cpu-score",
    "number-property/gpu-score",
    "number-property/hdd",
    "number-property/ssd",
    "select-property/brand",
    "select-property/computer-status",
    "select-property/cpu",
    "select-property/display",
    "select-property/display-refresh-rate",
    "select-property/display-resolution",
    "select-property/form-factor",
    "select-property/gpu",
    "select-property/gpu-size",
    "select-property/operating-system",
    "select-property/ram",
    "text-property/computer-model",
    "url-property/computer-link",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "select-property/brand", required: false, many: false },
    { pageProperty: "number-property/cost", required: false, many: false },
    { pageProperty: "number-property/cpu-score", required: true, many: false },
    { pageProperty: "select-property/cpu", required: true, many: false },
    { pageProperty: "select-property/display-refresh-rate", required: false, many: false },
    { pageProperty: "select-property/display-resolution", required: false, many: false },
    { pageProperty: "select-property/display", required: false, many: false },
    { pageProperty: "select-property/form-factor", required: true, many: false },
    { pageProperty: "number-property/gpu-score", required: true, many: false },
    { pageProperty: "select-property/gpu-size", required: false, many: false },
    { pageProperty: "select-property/gpu", required: true, many: false },
    { pageProperty: "number-property/hdd", required: false, many: false },
    { pageProperty: "url-property/computer-link", required: false, many: false },
    { pageProperty: "text-property/computer-model", required: false, many: false },
    { pageProperty: "select-property/operating-system", required: true, many: false },
    { pageProperty: "calendar-date-property/purchase-date", required: false, many: false },
    { pageProperty: "select-property/ram", required: true, many: false },
    { pageProperty: "number-property/ssd", required: true, many: false },
    { pageProperty: "select-property/computer-status", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A machine stays on the list once sold.",
    },
    {
      invariantKind: "departure",
      statement: "The cost and the replacement of a sold machine are still read.",
    },
    {
      invariantKind: "departure",
      statement: "Every score a machine has is worked out from its parts rather than written down.",
    },
  ],
} as const satisfies PageType
