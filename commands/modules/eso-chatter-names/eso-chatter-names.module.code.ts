export interface ChatterNamesModule {
  readonly chatter: readonly string[]
  readonly interaction: readonly string[]
  readonly text: string
}

function namesWithPrefix(source: string, prefix: string): readonly string[] {
  const pattern = new RegExp(`^declare const (${prefix}[A-Z0-9_]+):\\s*number`, "gm")
  const found = new Set<string>()
  for (const match of source.matchAll(pattern)) {
    const name = match[1]
    if (name !== undefined) found.add(name)
  }
  return [...found].sort()
}

function renderArray(exportName: string, names: readonly string[]): string {
  const body = names.map((n) => `  "${n}",`).join("\n")
  return `export const ${exportName}: readonly string[] = [\n${body}\n]`
}

export function chatterNamesModule(source: string, generatorRef: string): ChatterNamesModule {
  const chatter = namesWithPrefix(source, "CHATTER_")
  const interaction = namesWithPrefix(source, "INTERACTION_")

  const text = `/**
 * Chatter / Interaction constant-name registry (Generated)
 *
 * Source: types/eso/generated/enums.d.ts
 *
 * DO NOT EDIT — regenerate with:
 *   ${generatorRef}
 *
 * The auto-quest debug trace resolves option/interaction type codes to names by
 * reading each of these globals individually (\`_G[name]\`). It must NOT scan
 * \`pairs(_G)\` — that taints the ESO call stack on protected-function globals.
 */

${renderArray("CHATTER_OPTION_TYPE_NAMES", chatter)}

${renderArray("INTERACTION_TYPE_NAMES", interaction)}
`

  return { chatter, interaction, text }
}
