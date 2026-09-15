import { camelizeKey } from "akasha/page/naming/folding/modules/camelize-key/camelize-key.module.code.ts"

const PART = "."

export function segmentsOf(key: string): readonly string[] {
  return key.split(PART)
}

export function isPropertyPath(key: string): boolean {
  return key.includes(PART)
}

export function headOf(key: string): string {
  return segmentsOf(key)[0] ?? key
}

export function camelizePath(key: string): string {
  return segmentsOf(key)
    .map((one) => camelizeKey(one))
    .join(PART)
}

function fannedOut(values: readonly unknown[]): readonly unknown[] {
  const out: unknown[] = []
  for (const one of values) {
    if (Array.isArray(one)) out.push(...one)
    else out.push(one)
  }
  return out
}

function valuesAt(held: unknown, segments: readonly string[]): readonly unknown[] {
  let found: readonly unknown[] = [held]
  for (const segment of segments) {
    const next: unknown[] = []
    for (const one of fannedOut(found)) {
      if (one === null || typeof one !== "object") continue
      const taken = (one as Readonly<Record<string, unknown>>)[segment]
      if (taken !== undefined) next.push(taken)
    }
    found = next
  }
  return found
}

export function reachedIn(held: unknown, key: string): readonly unknown[] {
  return valuesAt(held, segmentsOf(key))
}
