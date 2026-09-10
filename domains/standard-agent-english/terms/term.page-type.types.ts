import type { Page } from "../../../pages/page.page-type.types.ts"
import type { Definition } from "../../properties/definition.standard-agent-english-property.ts"
import type { Spelling } from "./properties/spelling.text-property.ts"
import type { Variants } from "./properties/variants.text-property.ts"

export type Term = Page & {
  spelling: Spelling
  variants?: Variants
  definition: Definition
}
