import { dirname, join } from "node:path"
import type { Held, Work } from "../computing/page-computing.module.code.ts"
import { declaredIn } from "../value/page-value.module.code.ts"

const WORK = "work"

const SHARED = ".computed-property-module.code.ts"

const IMPORT = /^import\s*\{([^}]*)\}\s*from\s*"([^"]+)"[^\n]*$/gm

const TYPE_IMPORT = /^import\s+type\s+(?:\{[^}]*\}|[\w$]+)\s*from\s*"[^"]+"[^\n]*$/gm

const EXPORTED = /^export\s+/gm

const TYPED = /^type\s/

const AS = /\s+as\s+/

const DECLARES = "^export\\s+(?:async\\s+)?(?:function|const|let|class)\\s+"

export type TextOf = (path: string) => string | null

export type Loaded = { readonly work: Work<Held, unknown> } | { readonly failed: string }

type Taken = { readonly named: string; readonly local: string }

function takenIn(clause: string): readonly Taken[] {
  const found: Taken[] = []
  for (const each of clause.split(",")) {
    const said = each.trim()
    if (said === "" || TYPED.test(said)) continue
    const parts = said.split(AS)
    const named = parts[0] ?? said
    found.push({ named, local: parts[1] ?? named })
  }
  return found
}

function boundBy(taken: readonly Taken[], body: string): string {
  const held = taken.map((one) => `${one.named}: ${one.local}`).join(", ")
  const sent = taken.map((one) => one.named).join(", ")
  return `const { ${held} } = (() => {\n${body}\nreturn { ${sent} }\n})()`
}

function declaring(text: string, named: string): boolean {
  return new RegExp(`${DECLARES}${named}\\b`, "m").test(text)
}

function foldedIn(body: string, at: string, textOf: TextOf): string {
  let alone = body.replace(TYPE_IMPORT, "")
  for (const found of body.matchAll(IMPORT)) {
    const from = found[2] ?? ""
    if (!from.endsWith(SHARED)) continue
    const path = join(dirname(at), from)
    const text = textOf(path)
    if (text === null) throw new Error(`\`${from}\` reaches no file at \`${path}\``)
    const taken = takenIn(found[1] ?? "")
    for (const one of taken) {
      if (declaring(text, one.named)) continue
      throw new Error(`\`${from}\` exports no \`${one.named}\``)
    }
    const inner = foldedIn(text, path, textOf).replace(EXPORTED, "")
    alone = alone.split(found[0]).join(boundBy(taken, inner))
  }
  return alone
}

export function workIn(body: string, at: string, textOf: TextOf): Loaded {
  let declared: Record<string, unknown>
  try {
    declared = declaredIn(foldedIn(body, at, textOf))
  } catch (thrown) {
    return { failed: thrown instanceof Error ? thrown.message : String(thrown) }
  }
  const held = declared[WORK]
  if (typeof held === "function") return { work: held as Work<Held, unknown> }
  const named = Object.keys(declared).sort()
  const what = named.length === 0 ? "nothing" : named.map((one) => `\`${one}\``).join(", ")
  return {
    failed: `a calculation is the export named \`work\`, and this code file exports ${what}`,
  }
}
