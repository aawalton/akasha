import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"
import type { ManyDeclaration } from "akasha/pages/types/properties/many-declaration.record-property.types.ts"
import type { SingleDeclaration } from "akasha/pages/types/properties/single-declaration.record-property.types.ts"

export type Properties = List<ManyDeclaration | SingleDeclaration>
