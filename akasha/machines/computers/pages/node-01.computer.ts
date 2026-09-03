import type { Computer } from "../computer.page-type.ts"

export const node01 = {
  id: "019e8b92-3c6b-7db0-ba2e-bc8e47ec8491",
  pageTypeSlug: "computer",
  slug: "node-01",
  title: "node-01",
  cpuScore: 13178,
  cpu: "intel-core-i7-9700f",
  displayRefreshRate: "60-hz",
  displayResolution: "2560x1440",
  display: "acer-xz322qu-v3",
  formFactor: "desktop",
  gpuScore: 16474,
  gpuSize: "8gb",
  gpu: "nvidia-geforce-rtx-2060-super",
  hdd: 1800,
  operatingSystem: "windows-11-home",
  ram: "16gb",
  ssd: 465.8,
  computerStatus: "active",
} as const satisfies Computer
