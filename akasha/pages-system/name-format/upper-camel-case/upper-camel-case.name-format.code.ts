import { matching } from "../name-matching/name-matching.module.code.ts"

export const upperCamelCase = matching(/^([A-Z][a-z0-9]*)+$/)
