import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const gatewayLogDir = {
  id: "01a094fc-bd55-748a-baaf-dfeaad5bae3d",
  type: "page-type/argument",
  slug: "gateway-log-dir",
  said: "--log-dir",
  takes: "where the gateway console and the errors under it are written",
  value: "path",
  placeholder: "dir",
  createdAt: "2026-09-12T09:39:46.645Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
