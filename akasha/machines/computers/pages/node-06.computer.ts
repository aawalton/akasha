import type { Computer } from "../computer.page-type.ts"

export const node06 = {
  id: "019e8b92-3986-783e-a1fb-0c525265432d",
  pageTypeSlug: "computer",
  slug: "node-06",
  title: "node-06",
  brand: "corsair",
  cpuScore: 45370,
  cpu: "amd-ryzen-9-5950x",
  formFactor: "desktop",
  gpuScore: 25083,
  gpuSize: "10gb",
  gpu: "nvidia-geforce-rtx-3080",
  hdd: 2000,
  operatingSystem: "windows-11-home",
  ram: "64gb",
  ssd: 2000,
  computerStatus: "active",
} as const satisfies Computer
