import type { Body } from "../../checks-system/checking/checking.module.code.ts"

export function bytesOf(text: string): Uint8Array {
  return new TextEncoder().encode(text)
}

export function bodiesIn(root: string): (path: string, held: string | Uint8Array) => Body {
  return (path, held) => ({
    root,
    path,
    bytes: typeof held === "string" ? bytesOf(held) : held,
  })
}

export function bodiesAt(root: string, path: string): (held: string | Uint8Array) => Body {
  const made = bodiesIn(root)
  return (held) => made(path, held)
}
