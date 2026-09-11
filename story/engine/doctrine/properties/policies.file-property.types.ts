import type { policies } from "akasha/story/engine/doctrine/properties/policies.file-property.ts"

export type Policies = (typeof policies.extensions)[number]
