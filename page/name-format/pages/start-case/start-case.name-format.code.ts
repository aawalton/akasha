import { matching } from "akasha/page/name-format/modules/name-matching/name-matching.module.code.ts"

export const startCase = matching(/^[A-Z]\S*( [A-Z]\S*)*$/)
