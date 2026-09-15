import { matching } from "akasha/page/name-format/modules/name-matching/name-matching.module.code.ts"

export const lowerSnakeCase = matching(/^[a-z0-9]+(_[a-z0-9]+)*$/)
