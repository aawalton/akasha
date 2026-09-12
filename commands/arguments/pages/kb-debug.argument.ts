import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const kbDebug = {
  id: "01a094c6-be38-7ad6-9dde-84bef5e94c8a",
  type: "argument",
  slug: "kb-debug",
  said: "--kb-debug",
  takes: "mount the keyboard-geometry readout over the block editor",
  value: "none",
} as const satisfies Argument
