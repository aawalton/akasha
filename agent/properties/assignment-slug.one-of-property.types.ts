import type { AssignmentGame } from "akasha/agent/properties/assignment-game.relation-property.types.ts"
import type { Initiative } from "akasha/domain/initiative/properties/initiative.relation-property.types.ts"
import type { PageDomain } from "akasha/domain/properties/page-domain.relation-property.types.ts"

export type AssignmentSlug = PageDomain | Initiative | AssignmentGame
