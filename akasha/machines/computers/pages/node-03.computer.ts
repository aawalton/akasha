import type { Computer } from "../computer.page-type.ts"

export const node03 = {
  id: "019e8b92-3bd4-7ea8-8e55-98c70218c33f",
  pageTypeSlug: "computer",
  slug: "node-03",
  title: "node-03",
  cpuScore: 16150,
  cpu: "intel-core-i7-10700f",
  displayRefreshRate: "60-hz",
  displayResolution: "1920x1080",
  display: "samsung-smbx2440",
  formFactor: "desktop",
  gpuScore: 14113,
  gpuSize: "6gb",
  gpu: "nvidia-geforce-rtx-2060",
  hdd: 1800,
  operatingSystem: "windows-11-pro",
  ram: "32gb",
  ssd: 931.5,
  computerStatus: "active",
} as const satisfies Computer
