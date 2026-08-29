import { matching } from "../name-matching/name-matching.module.code.ts"

export const upperSnakeCase = matching(/^[A-Z0-9]+(_[A-Z0-9]+)*$/)
