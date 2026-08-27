import { cycleKey } from "./tsconfig-import-graph.ts"

export const ALLOWED_NON_CANONICAL_INCLUDE: ReadonlySet<string> = new Set<string>()

export const ALLOWED_ALLOW_IMPORTING_TS_EXTENSIONS: ReadonlySet<string> = new Set<string>()

export const ALLOWED_SPURIOUS_REFERENCES: ReadonlySet<string> = new Set<string>()

export const ALLOWED_MISSING_REFERENCES: ReadonlySet<string> = new Set<string>()

export const ALLOWED_CYCLES: ReadonlySet<string> = new Set(
  [
    "temper/player-completion-addon -> temper/game-characters-skills-morphs-addon",
  ].map((e) => {
    const [a, b] = e.split(" -> ")
    if (a === undefined || b === undefined) {
      throw new Error(`malformed cycle entry: ${e}`)
    }
    return cycleKey(a, b)
  })
)
