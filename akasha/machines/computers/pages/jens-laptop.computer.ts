import type { Computer } from "../computer.page-type.ts"

export const jensLaptop = {
  id: "019e8b92-3b42-7a76-9760-339f0e983027",
  pageTypeSlug: "computer",
  slug: "jens-laptop",
  title: "Jen’s Laptop",
  brand: "hp",
  cost: 992.73,
  cpuScore: 30775,
  cpu: "intel-core-ultra-7-255h",
  displayRefreshRate: "120-hz",
  displayResolution: "2048-x-1280",
  formFactor: "laptop",
  gpuScore: 5635,
  gpu: "intel-arc-140t",
  link: "https://www.costco.com/p/-/hp-omnibook-7-16-touchscreen-laptop/4000360799",
  computerModel: "16-ay0075cl",
  operatingSystem: "windows-11-home",
  purchaseDate: "2025-08-16",
  ram: "32gb",
  ssd: 1000,
  computerStatus: "active",
} as const satisfies Computer
