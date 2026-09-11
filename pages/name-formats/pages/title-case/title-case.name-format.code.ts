import { matching } from "akasha/pages/name-formats/modules/name-matching/name-matching.module.code.ts"

export const titleCase = matching(/^[A-Z]\S*(( \S+)* [A-Z]\S*)?$/)
