import type { Computer } from "akasha/infrastructure/machine/computer/computer.page-type.types.ts"

export const node05 = {
  id: "019e8b92-3cad-7015-8824-0df832adba06",
  type: "page-type/computer",
  slug: "node-05",
  title: "node-05",
  cpuScore: 8209,
  cpu: "intel-core-i7-3930k",
  displayRefreshRate: "60-hz",
  displayResolution: "1920x1080",
  display: "msi-g271",
  formFactor: "desktop",
  gpuScore: 9639,
  gpuSize: "4gb",
  gpu: "nvidia-geforce-gtx-970",
  hdd: 2700,
  operatingSystem: "windows-10-home",
  ram: "32gb",
  ssd: 223.6,
  computerStatus: "active",
  createdAt: "2026-06-03T03:41:17.357Z",
  updatedAt: "2026-09-15T16:29:54.000Z",
} as const satisfies Computer
