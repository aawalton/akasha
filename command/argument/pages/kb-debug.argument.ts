import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const kbDebug = {
  id: "01a094c6-be38-7ad6-9dde-84bef5e94c8a",
  type: "page-type/argument",
  slug: "kb-debug",
  said: "--kb-debug",
  takes: "mount the keyboard-geometry readout over the block editor",
  value: "none",
  createdAt: "2026-09-12T08:40:47.928Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
