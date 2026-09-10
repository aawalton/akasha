import type { Code } from "../../code-system/modules/properties/code.code-file-property.ts"
import type { Test } from "../../code-system/modules/properties/test.code-file-property.ts"
import type { PageProperty } from "../types/page-properties/page-property.page-type.types.ts"
import type { Holds } from "./properties/holds.select-property.ts"

export type ComputedProperty = PageProperty & {
  holds: Holds
  code: Code
  test?: Test
}
