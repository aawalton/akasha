import type { Page } from "../day-narrow-types/day-narrow-types.module.code.ts"
import { mtWallHm } from "../mountain-times/mountain-times.module.code.ts"

export function fieldStr(page: Page, key: string): string | undefined {
  const value = page[key]
  return typeof value === "string" ? value : undefined
}

export function fieldNum(page: Page, key: string): number | undefined {
  const value = page[key]
  if (typeof value === "number") return Number.isFinite(value) ? value : undefined
  if (typeof value !== "string" || value.trim() === "") return undefined
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

export function displayTitle(page: Page): string {
  return fieldStr(page, "title") ?? page.id
}

export function fmtMtHm(iso: string | undefined): string {
  if (iso === undefined) return "—"
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? "—" : mtWallHm(d)
}

export function fmtDuration(seconds: number): string {
  const s = Math.max(0, Math.round(seconds))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

export function durationSeconds(
  startIso: string | undefined,
  endIso: string | undefined
): number | undefined {
  if (startIso === undefined || endIso === undefined) return undefined
  const a = Date.parse(startIso)
  const b = Date.parse(endIso)
  if (Number.isNaN(a) || Number.isNaN(b)) return undefined
  return Math.max(0, (b - a) / 1000)
}
