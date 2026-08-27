import { describe, expect, test } from "bun:test"
import { discoverRuleFiles, discoverSgconfigs, readAstGrepRules } from "../../../../../instructions/tools/lib/check-workflow/check-configs-ast-grep"
import { getRepoRoot } from "./repo-root.ts"

const repoRoot = getRepoRoot()
const readRules = readAstGrepRules(repoRoot)

describe("ast-grep discovery", () => {
  test("finds a config in more than one package, so the route is not single-package", () => {
    const configs = discoverSgconfigs(repoRoot)
    expect(configs.length).toBeGreaterThan(1)
  })

  test("every rule file on disk is one the route can parse", () => {
    expect(readRules.gaps).toEqual([])
    expect(readRules.rules.length).toBe(discoverRuleFiles(repoRoot).length)
  })

  test("every discovered rule declares an id, a language and at least one files glob", () => {
    for (const { rule } of readRules.rules) {
      expect(rule.id).not.toBe("")
      expect(rule.language).not.toBe("")
      expect(rule.filesGlobs.length).toBeGreaterThan(0)
    }
  })

  test("every rule lives under a `rules/` dir declared by a sibling sgconfig", () => {
    for (const path of discoverRuleFiles(repoRoot)) {
      expect(path).toMatch(/\/rules\/[^/]+\.ya?ml$/)
    }
  })

  test("the source handed to `--inline-rules` is the rule file's own text", () => {
    for (const { rule, source } of readRules.rules) {
      expect(source).toContain(`id: ${rule.id}`)
    }
  })
})
