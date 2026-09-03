import type { Rule } from "../markdown-property-stating/markdown-property-stating.module.code.ts"
import { scalarRule } from "../markdown-property-stating/markdown-property-stating.module.code.ts"

const HOLE = /\{([^{}]*)\}/g

const BRACE = /[{}]/

export const templateRule: Rule = scalarRule(
  "fixed words with at least one `{name}` hole among them",
  (text) => {
    let holes = 0
    for (const [, name] of text.matchAll(HOLE)) {
      if (name === undefined || name.trim() === "") return false
      holes++
    }
    return holes > 0 && !BRACE.test(text.replace(HOLE, ""))
  }
)
