"use client"

import { useCallback, useMemo } from "react"
import { z } from "zod"

const ACTIVE_TOKEN_MATCH_SCHEMA = z.array(z.string()).min(1)

export interface InlineCompletionSource {
  readonly sigil: string
  readonly candidates: readonly string[]
  readonly frequency?: ReadonlyMap<string, number>
}

export interface UseInlineCompletionOptions {
  readonly value: string
  readonly cursorPos: number
  readonly sources: readonly InlineCompletionSource[]
}

export interface UseInlineCompletionResult {
  readonly suggestion: string | null
  readonly accept: () => string
}

interface ActiveToken {
  readonly token: string
  readonly sigil: string
  readonly typed: string
}

function escapeForCharClass(s: string): string {
  return s.replace(/[\\\]^-]/g, "\\$&")
}

function findBestMatch(
  candidates: readonly string[],
  typed: string,
  frequency: ReadonlyMap<string, number> | undefined
): string | null {
  const matched = candidates.filter((c) => c.toLowerCase().startsWith(typed))
  if (matched.length === 0) return null
  if (frequency === undefined) return matched[0] ?? null
  return matched.reduce((best, c) =>
    (frequency.get(c) ?? 0) > (frequency.get(best) ?? 0) ? c : best
  )
}

export function useInlineCompletion(opts: UseInlineCompletionOptions): UseInlineCompletionResult {
  const { value, cursorPos, sources } = opts

  const activeTokenRegex = useMemo(() => {
    if (sources.length === 0) return null
    const sigils = sources.map((s) => escapeForCharClass(s.sigil)).join("")
    return new RegExp(`[${sigils}][\\w-]*$`)
  }, [sources])

  const activeToken = useMemo<ActiveToken | null>(() => {
    if (activeTokenRegex === null) return null
    const before = value.slice(0, cursorPos)
    const matchResult = ACTIVE_TOKEN_MATCH_SCHEMA.safeParse(before.match(activeTokenRegex))
    if (!matchResult.success) return null
    const token = matchResult.data[0]
    if (token === undefined) return null
    const sigil = token[0]
    if (sigil === undefined) return null
    return { token, sigil, typed: token.slice(1).toLowerCase() }
  }, [value, cursorPos, activeTokenRegex])

  const matchForActiveToken = useMemo<string | null>(() => {
    if (activeToken === null) return null
    const source = sources.find((s) => s.sigil === activeToken.sigil)
    if (source === undefined) return null
    return findBestMatch(source.candidates, activeToken.typed, source.frequency)
  }, [activeToken, sources])

  const suggestion = useMemo<string | null>(() => {
    if (activeToken === null || matchForActiveToken === null) return null
    if (activeToken.typed === matchForActiveToken.toLowerCase()) return null
    return matchForActiveToken.slice(activeToken.typed.length)
  }, [activeToken, matchForActiveToken])

  const accept = useCallback((): string => {
    if (activeToken === null || matchForActiveToken === null) return value
    const fullCompletion = `${activeToken.sigil}${matchForActiveToken}`
    const tokenStart = cursorPos - activeToken.token.length
    return `${value.slice(0, tokenStart)}${fullCompletion} ${value.slice(cursorPos)}`
  }, [activeToken, matchForActiveToken, value, cursorPos])

  return { suggestion, accept }
}
