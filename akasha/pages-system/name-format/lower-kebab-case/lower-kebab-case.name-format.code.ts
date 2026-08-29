import { matching } from "../name-matching/name-matching.module.code.ts"

export const lowerKebabCase = matching(/^[a-z0-9]+(-[a-z0-9]+)*$/)
