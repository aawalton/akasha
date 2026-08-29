import { matching } from "../name-matching.module.code.ts"

export const sentenceCase = matching(/^[A-Z]\S*( \S+)*$/)
