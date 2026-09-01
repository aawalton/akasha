import { matching } from "../../modules/name-matching/name-matching.module.code.ts"

export const sentenceCase = matching(/^[A-Z]\S*( \S+)*$/)
