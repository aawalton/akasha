import { matching } from "akasha/page/name-format/modules/name-matching/name-matching.module.code.ts"

export const sentenceCase = matching(/^[A-Z]\S*( \S+)*$/)
