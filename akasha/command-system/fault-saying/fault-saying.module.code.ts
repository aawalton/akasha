import { oneLine } from "../landing/landing.module.code.ts"

export function saidBy(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

export function whyOf(thrown: unknown): string {
  return oneLine(saidBy(thrown))
}
