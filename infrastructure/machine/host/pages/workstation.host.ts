import type { Host } from "akasha/infrastructure/machine/host/host.page-type.types.ts"

export const workstation = {
  id: "01a06590-e94f-7a8c-a9bf-dd26522b8fd3",
  type: "page-type/host",
  slug: "workstation",
  definition: "Alan's Linux desktop",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "workstation" }],
  title: "Workstation",
  createdAt: "2026-09-03T04:39:50.863Z",
  updatedAt: "2026-10-30T16:11:39.090Z",
} as const satisfies Host
