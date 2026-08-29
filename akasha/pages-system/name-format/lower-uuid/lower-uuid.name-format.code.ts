import { matching } from "../name-matching/name-matching.module.code.ts"

export const lowerUuid = matching(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
