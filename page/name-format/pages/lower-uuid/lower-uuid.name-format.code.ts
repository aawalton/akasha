import { matching } from "akasha/page/name-format/modules/name-matching/name-matching.module.code.ts"

export const lowerUuid = matching(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
