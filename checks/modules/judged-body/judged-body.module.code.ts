import type { Body } from "../change-walking/change-walking.module.code.ts"

export function bodyFrom(root: string, at: string, text: string): Body {
  return { root, path: at, bytes: new TextEncoder().encode(text) }
}
