import type { Frame } from "../banned-terms/properties/prose-frame.relation-property.ts"
import type { Found } from "../prose-pattern/prose-pattern.module.code.ts"

const SLOT = /^\[[a-z]+\]$/

const WORD = /[A-Za-z']+/g

const SPACE = /\s+/

export type Pattern = {
  readonly frame: Frame
  readonly fromPattern: string
  readonly toPattern: string
}

export type Rewrite = {
  readonly start: number
  readonly end: number
  readonly put: string
}

export type Spelt = {
  readonly word: string
  readonly start: number
  readonly end: number
}

export function wordsOf(pattern: string): readonly string[] {
  return pattern.split(SPACE).filter((one) => one !== "" && !SLOT.test(one))
}

export function speltIn(text: string): readonly Spelt[] {
  const found: Spelt[] = []
  for (const match of text.matchAll(WORD)) {
    const word = match[0]
    found.push({ word: word.toLowerCase(), start: match.index, end: match.index + word.length })
  }
  return found
}

function spanOf(spelt: readonly Spelt[], at: number, words: readonly string[]): Rewrite | null {
  const held = spelt[at]
  if (held === undefined) return null
  const from = words.indexOf(held.word)
  if (from < 0) return null
  const opened = spelt[at - from]
  const closed = spelt[at - from + words.length - 1]
  if (opened === undefined || closed === undefined) return null
  for (let step = 0; step < words.length; step += 1) {
    if (spelt[at - from + step]?.word !== words[step]) return null
  }
  return { start: opened.start, end: closed.end, put: "" }
}

function rewriteAt(spelt: readonly Spelt[], at: number, pattern: Pattern): Rewrite | null {
  const span = spanOf(spelt, at, wordsOf(pattern.fromPattern))
  if (span === null) return null
  return { start: span.start, end: span.end, put: wordsOf(pattern.toPattern).join(" ") }
}

export function rewritesFor(
  text: string,
  found: readonly Found[],
  patterns: readonly Pattern[]
): readonly Rewrite[] {
  const spelt = speltIn(text)
  const rewrites: Rewrite[] = []
  for (const one of found) {
    const at = spelt.findIndex((each) => each.start === one.start && each.end === one.end)
    if (at < 0) continue
    for (const pattern of patterns) {
      if (pattern.frame !== one.frame) continue
      const rewrite = rewriteAt(spelt, at, pattern)
      if (rewrite === null) continue
      rewrites.push(rewrite)
      break
    }
  }
  return rewrites
}

export function rewritten(text: string, rewrites: readonly Rewrite[]): string {
  let left = text
  for (const one of [...rewrites].sort((a, b) => b.start - a.start)) {
    left = left.slice(0, one.start) + one.put + left.slice(one.end)
  }
  return left
}
