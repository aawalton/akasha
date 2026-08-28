import { type Parts, partsIn, textAt } from "../read/files.ts"
import type { Standing } from "./rows.ts"

export type StandingPage =
  | { readonly kind: "standing"; readonly parts: Parts }
  | { readonly kind: "none" }
  | { readonly kind: "unreadable"; readonly why: string }

const brokenAs = (why: unknown): string => (why instanceof Error ? why.message : String(why))

export const standingAt = (root: string, at: string): Standing => {
  let text: string | null
  try {
    text = textAt(root, at)
  } catch (why) {
    return { kind: "unreadable", why: brokenAs(why) }
  }
  return text === null ? { kind: "none" } : { kind: "standing", text }
}

export const standingPageAt = (root: string, at: string): StandingPage => {
  let text: string | null
  try {
    text = textAt(root, at)
  } catch (why) {
    return { kind: "unreadable", why: brokenAs(why) }
  }
  if (text === null) return { kind: "none" }
  const parts = partsIn(text)
  return typeof parts === "string" ? { kind: "unreadable", why: parts } : { kind: "standing", parts }
}
