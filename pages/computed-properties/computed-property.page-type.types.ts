import type { Module } from "../../code-system/modules/module.page-type.ts"
import type { PageProperty } from "../types/page-properties/page-property.page-type.types.ts"
import type { Holds } from "./properties/holds.select-property.ts"

export type ComputedProperty = Module &
  PageProperty & {
    holds: Holds
  }
