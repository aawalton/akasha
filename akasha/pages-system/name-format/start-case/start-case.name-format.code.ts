import { matching } from "../name-matching.module.code.ts"

export const startCase = matching(/^[A-Z]\S*( [A-Z]\S*)*$/)
