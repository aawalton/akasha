import { matching } from "../name-matching/name-matching.module.code.ts"

export const sentenceCase = matching(/^[A-Z]\S*( \S+)*$/)
