import type { Computer } from "../computer.page-type.ts"

export const node04 = {
  id: "019e8b92-3c10-712c-8316-74acd1f6e6ea",
  pageTypeSlug: "computer",
  slug: "node-04",
  title: "node-04",
  cpuScore: 17690,
  cpu: "amd-ryzen-5-3600",
  displayRefreshRate: "60-hz",
  displayResolution: "1920x1080",
  display: "msi-g271",
  formFactor: "desktop",
  gpuScore: 12779,
  gpuSize: "6gb",
  gpu: "nvidia-geforce-gtx-1660-ti",
  hdd: 931.5,
  operatingSystem: "windows-11-home",
  ram: "16gb",
  ssd: 476.9,
  computerStatus: "active",
} as const satisfies Computer
