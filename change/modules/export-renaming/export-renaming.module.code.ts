import {
  type FileChange,
  refusing,
  type Said,
  type Splice,
  splicing,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  boundAs,
  declaredNamed,
  exportsNamed,
  reachedFrom,
  referencesOf,
} from "akasha/code/reading/modules/code-naming/code-naming.module.code.ts"
import {
  type Placing,
  readingOf,
  typingOver,
} from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"

export function exportRenamed(
  root: string,
  at: string,
  over: readonly string[],
  of: string,
  to: string,
  textOf: (path: string) => string | null,
  placed: Placing
): Said {
  const typing = typingOver(root, over, readingOf(root, textOf, placed), placed)
  const exported = exportsNamed(typing, at, of)
  const declared = new Set(exported.length > 0 ? exported : declaredNamed(typing, at, of))
  if (declared.size === 0) return refusing(`\`${at}\` declares no \`${of}\``)
  const held = new Map<string, Splice[]>()
  const seen = new Set<string>()
  for (const found of referencesOf(typing, root, declared)) {
    const spot = `${found.path}:${found.start}`
    if (seen.has(spot)) continue
    seen.add(spot)
    const spots = held.get(found.path) ?? []
    spots.push({ from: found.start, to: found.end, put: boundAs(found, of, to) })
    held.set(found.path, spots)
  }
  if (held.size === 0) return refusing(`nothing names \`${of}\`, so there is nothing to spell`)
  for (const path of held.keys()) {
    const source = typing.sourceAt(path)
    if (source === null) return refusing(`\`${path}\` would change and could not be read`)
    if (reachedFrom(typing, source, to).length > 0) {
      return refusing(`\`${path}\` already reaches a \`${to}\``)
    }
  }
  const edits: FileChange[] = []
  for (const [path, spots] of held) {
    const text = textOf(path)
    if (text === null) return refusing(`\`${path}\` would change and could not be read`)
    const sorted = [...spots].sort((here, there) => here.from - there.from)
    edits.push(...splicing(path, text, sorted))
  }
  return stating(edits)
}
