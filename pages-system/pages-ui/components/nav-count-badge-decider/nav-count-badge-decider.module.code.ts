import { z } from "zod"

const ShowCountBadgeSchema = z.boolean().nullable().optional()

export function parseShowCountBadge(raw: unknown): boolean {
  return ShowCountBadgeSchema.parse(raw) === true
}

export function shouldShowCountBadge(count: number | null): count is number {
  return count !== null && count > 0
}
