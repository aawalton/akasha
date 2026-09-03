import type { Computer } from "../computer.page-type.ts"

export const node02 = {
  id: "019e8b92-3b99-7f0e-b56f-6b072412828a",
  pageTypeSlug: "computer",
  slug: "node-02",
  title: "node-02",
  cpuScore: 12969,
  cpu: "intel-core-i7-7800x",
  displayRefreshRate: "60-hz",
  displayResolution: "1920x1080",
  display: "samsung-s24d300",
  formFactor: "desktop",
  gpuScore: 18604,
  gpuSize: "11gb",
  gpu: "nvidia-geforce-gtx-1080-ti",
  operatingSystem: "windows-10-home",
  ram: "64gb",
  ssd: 931.5,
  computerStatus: "active",
} as const satisfies Computer
