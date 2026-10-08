import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const stockQuantity = {
  id: "01a094bd-dc11-762c-ae74-a7780cab7372",
  type: "page-type/argument",
  slug: "stock-quantity",
  said: "--stock-quantity",
  takes: "how many the destination is stocked up to",
  value: "whole-number",
  placeholder: "n",
  createdAt: "2026-09-12T08:31:05.745Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
