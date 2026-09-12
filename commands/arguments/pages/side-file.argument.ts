import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const sideFile = {
  id: "01a094be-8857-7cc6-8e7e-875c625fd92f",
  type: "argument",
  slug: "side-file",
  said: "--side-file",
  takes: "the file the catalog addon's outstanding collection request is carried in",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
