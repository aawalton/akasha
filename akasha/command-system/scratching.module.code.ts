import { mkdtempSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

export type Scratch = {
  readonly rootFor: (prefix: string) => string
  readonly sweep: () => void
}

export function scratchWorld(): Scratch {
  const held: string[] = []
  return {
    rootFor: (prefix: string): string => {
      const root = mkdtempSync(join(tmpdir(), prefix))
      held.push(root)
      return root
    },
    sweep: (): void => {
      for (const one of held) rmSync(one, { recursive: true, force: true })
    },
  }
}
