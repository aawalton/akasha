import { matching } from "../name-matching/name-matching.module.code.ts"

export const upperUuid = matching(/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/)
