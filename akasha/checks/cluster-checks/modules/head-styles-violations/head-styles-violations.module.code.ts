import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import { z } from "zod"

export interface HeadStylesViolation {
  line: number
  exportName: string
  declaration: string
}

const HEAD_STYLES_NAME_RE = /^[A-Z][A-Z0-9_]*_HEAD_STYLES$/

const EXPORT_DECL_RE = /^\s*export\s+const\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*`/

const POSITIVE_MARGIN_CSS_RE =
  /\b(margin(?:-(?:left|right|top|bottom|inline(?:-(?:start|end))?|block(?:-(?:start|end))?))?)\s*:\s*([^;}\n]+)/

function isAllowedSingleMarginValue(value: string): boolean {
  if (
    value === "auto" ||
    value === "inherit" ||
    value === "initial" ||
    value === "unset" ||
    value === "revert"
  ) {
    return true
  }
  if (/^0(?:\.0+)?(?:px|rem|em|%|vw|vh|ch|ex)?$/.test(value)) return true
  if (value.startsWith("-")) return true
  return false
}

function isAllowedMarginValue(rawValue: string): boolean {
  const parts = rawValue.trim().toLowerCase().split(/\s+/)
  if (parts.length === 0) return true
  return parts.every(isAllowedSingleMarginValue)
}

interface HeadStylesExport {
  exportName: string
  startLine: number
  cssLines: readonly string[]
  cssStartLine: number
}

function extractHeadStylesExports(source: string): readonly HeadStylesExport[] {
  const out: HeadStylesExport[] = []
  const lines = source.split("\n")
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? ""
    if (!EXPORT_DECL_RE.test(line)) continue
    const [name] = requireMatchPositional(EXPORT_DECL_RE, z.tuple([z.string()]), line)
    if (!HEAD_STYLES_NAME_RE.test(name)) continue
    const openIdx = line.indexOf("`")
    if (openIdx < 0) continue
    const cssLines: string[] = []
    const firstLineRest = line.slice(openIdx + 1)
    const closeOnSameLine = firstLineRest.indexOf("`")
    if (closeOnSameLine >= 0) {
      cssLines.push(firstLineRest.slice(0, closeOnSameLine))
    } else {
      cssLines.push(firstLineRest)
      let j = i + 1
      while (j < lines.length) {
        const next = lines[j] ?? ""
        const closeIdx = next.indexOf("`")
        if (closeIdx >= 0) {
          cssLines.push(next.slice(0, closeIdx))
          break
        }
        cssLines.push(next)
        j++
      }
    }
    out.push({
      exportName: name,
      startLine: i + 1,
      cssLines,
      cssStartLine: i + 1,
    })
  }
  return out
}

export function findHeadStylesViolations(source: string): readonly HeadStylesViolation[] {
  const exports = extractHeadStylesExports(source)
  const out: HeadStylesViolation[] = []
  for (const exp of exports) {
    for (let li = 0; li < exp.cssLines.length; li++) {
      const cssLine = exp.cssLines[li] ?? ""
      if (!POSITIVE_MARGIN_CSS_RE.test(cssLine)) continue
      const [property, value] = requireMatchPositional(
        POSITIVE_MARGIN_CSS_RE,
        z.tuple([z.string(), z.string()]),
        cssLine
      )
      if (isAllowedMarginValue(value)) continue
      out.push({
        line: exp.cssStartLine + li,
        exportName: exp.exportName,
        declaration: `${property}: ${value.trim()}`,
      })
    }
  }
  return out
}
