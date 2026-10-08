import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const talos = {
  id: "01a06813-7b0e-79e0-ae0d-60b8f8c4a138",
  type: "page-type/domain",
  slug: "talos",
  definition: "how code uses Talos",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Talos" }],
  parts: [
    "module/build-patch",
    "module/build-schematic",
    "module/build-volumes",
    "module/emit-yaml",
    "module/factory",
    "module/nodes",
    "module/nodes-main",
    "module/nodes-rehearsal",
    "module/paths",
    "module/registry-ca",
    "module/schema",
    "module/sops",
    "module/ssh",
    "module/talosctl",
    "module/wait-for-port",
  ],
  createdAt: "2026-09-03T16:21:42.286Z",
  updatedAt: "2026-09-25T16:30:20.000Z",
} as const satisfies Domain
