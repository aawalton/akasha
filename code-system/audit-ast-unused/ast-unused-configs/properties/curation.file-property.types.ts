import type { curation } from "akasha/code-system/audit-ast-unused/ast-unused-configs/properties/curation.file-property.ts"

export type Curation = (typeof curation.extensions)[number]
