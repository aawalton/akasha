import type { workspaces } from "akasha/code-system/audit-ast-unused/ast-unused-configs/properties/workspaces.file-property.ts"

export type Workspaces = (typeof workspaces.extensions)[number]
