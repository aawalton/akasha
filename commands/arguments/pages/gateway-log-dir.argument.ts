import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const gatewayLogDir = {
  id: "01a094fc-bd55-748a-baaf-dfeaad5bae3d",
  type: "argument",
  slug: "gateway-log-dir",
  said: "--log-dir",
  takes: "where the gateway console and the errors under it are written",
  value: "path",
  placeholder: "dir",
} as const satisfies Argument
