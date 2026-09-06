import type { Change } from "../../../pages/change/change.module.code.ts"
import { type Cast, shadowFor } from "../../../pages/shadow/shadow.module.code.ts"
import type { Answer, Edit } from "../change-answer/change-answer.module.types.ts"

const BYTES = new TextEncoder()

function bytesOf(body: string | null): Uint8Array | null {
  return body === null ? null : BYTES.encode(body)
}

export function changeOver(root: string, said: Answer): Change {
  const held = new Map<string, Edit>()
  const left = new Map<string, Edit>()
  for (const one of said.edits) {
    held.set(one.path, one)
    if (one.from !== undefined) left.set(one.from, one)
  }
  const changed = [...new Set([...held.keys(), ...left.keys()])].sort()
  return {
    root,
    changed,
    before: (path) => {
      const moved = left.get(path)
      if (moved !== undefined) return bytesOf(moved.was)
      const one = held.get(path)
      return one === undefined || one.from !== undefined ? null : bytesOf(one.was)
    },
    after: (path) => {
      const one = held.get(path)
      return one === undefined ? null : bytesOf(one.body)
    },
  }
}

export function shadowOver(root: string, said: Answer): Cast {
  return shadowFor(changeOver(root, said))
}
