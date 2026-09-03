import type { Computer } from "../computer.page-type.ts"

export const josephsPc = {
  id: "019e8b92-3a02-7515-9256-b41a3238e7d5",
  pageTypeSlug: "computer",
  slug: "josephs-pc",
  title: "Joseph’s PC",
  brand: "msi",
  cost: 544.74,
  cpuScore: 49752,
  cpu: "intel-core-ultra-7-265",
  formFactor: "desktop",
  gpuScore: 20784,
  gpuSize: "8gb",
  gpu: "nvidia-geforce-rtx-5060",
  link: "https://www.costco.com/p/-/msi-codex-r2-gaming-desktop-intel-core-ultra-7-265-nvidia-rtx-5060-8gb-windows-11-home-32gb-ram-2tb-ssd/4000379838",
  computerModel: "R2 AI A2NVL7-464US",
  operatingSystem: "windows-11-home",
  purchaseDate: "2025-11-03",
  ram: "32gb",
  ssd: 2000,
  computerStatus: "active",
} as const satisfies Computer
