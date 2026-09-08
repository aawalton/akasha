import type { Asking, Row } from "./readout-asking.module.code.ts"

export function answering(rows: readonly Row[]): Asking {
  return async () => ({ ok: true, rows })
}

export function refusing(why: string): Asking {
  return async () => ({ ok: false, why })
}
