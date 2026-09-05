import type { Held, Work } from "../computing/page-computing.module.code.ts"
import { declaredIn } from "../value/page-value.module.code.ts"

const WORK = "work"

export type Loaded = { readonly work: Work<Held, unknown> } | { readonly failed: string }

function whyOf(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

export function workIn(body: string): Loaded {
  let declared: Record<string, unknown>
  try {
    declared = declaredIn(body)
  } catch (thrown) {
    return { failed: whyOf(thrown) }
  }
  const held = declared[WORK]
  if (typeof held === "function") return { work: held as Work<Held, unknown> }
  const named = Object.keys(declared).sort()
  const what = named.length === 0 ? "nothing" : named.map((one) => `\`${one}\``).join(", ")
  return {
    failed: `a calculation is the export named \`work\`, and this code file exports ${what}`,
  }
}
