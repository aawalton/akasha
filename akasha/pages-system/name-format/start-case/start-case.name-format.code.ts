import { matching } from "../name-matching/name-matching.module.code.ts"

export const startCase = matching(/^[A-Z]\S*( [A-Z]\S*)*$/)
