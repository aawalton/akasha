import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { ManyDeclaration } from "akasha/page/type/properties/many-declaration.record-property.types.ts"
import type { SingleDeclaration } from "akasha/page/type/properties/single-declaration.record-property.types.ts"

export type Properties = List<ManyDeclaration | SingleDeclaration>
