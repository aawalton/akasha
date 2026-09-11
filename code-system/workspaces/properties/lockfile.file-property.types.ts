import type { lockfile } from "akasha/code-system/workspaces/properties/lockfile.file-property.ts"

export type Lockfile = (typeof lockfile.extensions)[number]
