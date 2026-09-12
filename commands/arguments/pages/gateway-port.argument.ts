import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const gatewayPort = {
  id: "01a094fd-2959-7908-b243-c680fc00dc1a",
  type: "argument",
  slug: "gateway-port",
  said: "--port",
  takes: "the port to ask for, 0 for any free one",
  value: "whole-number",
  placeholder: "port",
} as const satisfies Argument
