import { formatCount } from "akasha/temper/window/modules/window-numbers/window-numbers.module.code.ts"

export function progressSuffix(current: number, total: number): string {
  return `(${formatCount(current)}/${formatCount(total)})`
}

export function countSuffix(count: number): string {
  return `(${formatCount(count)})`
}

export function formatProgressCount(label: string, current: number, total: number): string {
  return `${label} ${progressSuffix(current, total)}`
}
