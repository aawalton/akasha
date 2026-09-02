import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import { z } from "zod"

const DEFAULT_INDENT = "            "

const LEADING_SPACE = /^(\s*)/

function keyToken(key: string): string {
  return `["${key}"]`
}

function lineHolding(lines: readonly string[], key: string): number {
  return lines.findIndex((line) => line.includes(keyToken(key)))
}

function blockEndFrom(lines: readonly string[], blockStart: number): number {
  let depth = 0
  let entered = false
  for (let i = blockStart; i < lines.length; i++) {
    const line = lines[i]
    if (line === undefined) break
    for (const ch of line) {
      if (ch === "{") {
        depth++
        entered = true
      }
      if (ch === "}") depth--
    }
    if (entered && depth <= 0) return i
  }
  return blockStart
}

export function replaceOrInsertLuaBlock(
  lines: readonly string[],
  key: string,
  newBlock: readonly string[],
  siblingKeys: readonly string[]
): readonly string[] {
  const blockStart = lineHolding(lines, key)
  if (blockStart !== -1) {
    const blockEnd = blockEndFrom(lines, blockStart)
    return [...lines.slice(0, blockStart), ...newBlock, ...lines.slice(blockEnd + 1)]
  }

  for (const siblingKey of siblingKeys) {
    const at = lineHolding(lines, siblingKey)
    if (at !== -1) return [...lines.slice(0, at), ...newBlock, ...lines.slice(at)]
  }

  console.warn(
    `replaceOrInsertLuaBlock: no anchor for key=${JSON.stringify(key)} (siblings=${JSON.stringify(siblingKeys)}); leaving content unchanged`
  )
  return lines
}

export function detectIndent(
  lines: readonly string[],
  key: string,
  siblingKeys: readonly string[]
): string {
  for (const candidate of [key, ...siblingKeys]) {
    const at = lineHolding(lines, candidate)
    if (at === -1) continue
    const line = lines[at]
    if (line === undefined) continue
    const [indent] = requireMatchPositional(LEADING_SPACE, z.tuple([z.string()]), line)
    return indent
  }
  return DEFAULT_INDENT
}
