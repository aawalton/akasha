import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const gatewayPort = {
  id: "01a094fd-2959-7908-b243-c680fc00dc1a",
  type: "page-type/argument",
  slug: "gateway-port",
  said: "--port",
  takes: "the port to ask for, 0 for any free one",
  value: "whole-number",
  placeholder: "port",
  createdAt: "2026-09-12T09:40:14.297Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
