import { matching } from "../name-matching/name-matching.module.code.ts"

export const lowerCamelCase = matching(/^[a-z][a-z0-9]*([A-Z][a-z0-9]*)*$/)
