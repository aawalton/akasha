import { describe, expect, test } from "bun:test"
import ts from "typescript"
import { SYNTAX_SCANNER_ENTRIES } from "../lib/scanner-registry.ts"
import { scriptKindFor } from "../lib/syntax-scanner-entry.ts"
import {
  libSetsPerPieceDifficultyBoundaryEntry as ENTRY,
  isOutOfScope,
  PER_PIECE_BOUNDARIES,
  scanPerPieceVeteranReferences,
} from "./check-lib-sets-per-piece-difficulty-boundary.ts"

const LIB_SETS_SRC = "temper/shared-addon-libraries-lib-sets/src/"
const HELPERS_FILE = `${LIB_SETS_SRC}tooltips/helpers.ts`
const PER_SET_SURFACE = `${LIB_SETS_SRC}tooltips/veteran-breakdown.ts`
const VETERAN_API_FILE = `${LIB_SETS_SRC}core/api-perfected-veteran-set.ts`
const OTHER_FILE = `${LIB_SETS_SRC}tooltips/drop-mechanic-render.ts`

const DIFFICULTY = `getDungeon${"Difficulty"}Str`
const VETERAN_LOWER = `is${"Veteran"}Set`
const VETERAN_UPPER = `Is${"Veteran"}Set`

describe("scanPerPieceVeteranReferences — the per-piece difficulty boundary", () => {
  test("flags a named import of the per-piece difficulty reader from an unsanctioned file", () => {
    const source = [
      `import { ${DIFFICULTY} } from "./helpers"`,
      "export function render(setData: object, itemLink: string): void {",
      `  const [text] = ${DIFFICULTY}(setData, itemLink, false)`,
      "  print(text)",
      "}",
    ].join("\n")
    const found = scanPerPieceVeteranReferences(source, OTHER_FILE)
    expect(found.map((v) => v.symbol)).toEqual([DIFFICULTY, DIFFICULTY])
    expect(found.map((v) => v.line)).toEqual([1, 3])
    expect(found[0]?.file).toBe(OTHER_FILE)
    expect(found[0]?.kind).toBe("per-piece-veteran-reference")
  })

  test("the finding says WHY and names the sanctioned per-set surface", () => {
    const found = scanPerPieceVeteranReferences(`export const x = ${DIFFICULTY}`, OTHER_FILE)
    const message = found[0]?.message ?? ""
    expect(message).toContain("PER-PIECE")
    expect(message).toContain("preserved verbatim")
    expect(message).toContain(PER_SET_SURFACE)
  })

  test("no runtime message names an internal project number", () => {
    for (const boundary of PER_PIECE_BOUNDARIES) {
      expect(boundary.guidance).not.toMatch(/#\d{3,}/)
    }
  })

  test("the sanctioned chokepoint file may call the per-piece difficulty reader", () => {
    const source = [
      `import { ${DIFFICULTY} } from "./helpers"`,
      `export function perSetLine(setData: object, itemLink: string) {`,
      `  return ${DIFFICULTY}(setData, itemLink, false)`,
      "}",
    ].join("\n")
    expect(scanPerPieceVeteranReferences(source, PER_SET_SURFACE)).toEqual([])
  })

  test("the defining file may declare and export the per-piece difficulty reader", () => {
    const source = `export function ${DIFFICULTY}(setData: object): string {\n  return ""\n}\n`
    expect(scanPerPieceVeteranReferences(source, HELPERS_FILE)).toEqual([])
  })

  test("the defining file may declare and publish the per-piece veteran API", () => {
    const source = [
      `function ${VETERAN_LOWER}(setId: number, itemLink: string): boolean {`,
      "  return false",
      "}",
      `lib.${VETERAN_UPPER} = ${VETERAN_LOWER}`,
    ].join("\n")
    expect(scanPerPieceVeteranReferences(source, VETERAN_API_FILE)).toEqual([])
  })

  test("flags a property-access call of the per-piece veteran API from anywhere else", () => {
    const source = `const gated = LibSets.${VETERAN_UPPER}(setId, itemLink)\n`
    const found = scanPerPieceVeteranReferences(source, OTHER_FILE)
    expect(found.map((v) => v.symbol)).toEqual([VETERAN_UPPER])
  })

  test("flags a string-keyed element access (the dynamic-dispatch escape hatch)", () => {
    const source = `const gated = lib["${VETERAN_UPPER}"](setId, itemLink)\n`
    const found = scanPerPieceVeteranReferences(source, OTHER_FILE)
    expect(found.map((v) => v.symbol)).toEqual([VETERAN_UPPER])
  })

  test("the chokepoint is sanctioned for the difficulty reader only, not the veteran API", () => {
    const source = `const gated = lib.${VETERAN_UPPER}(setId, itemLink)\n`
    expect(scanPerPieceVeteranReferences(source, PER_SET_SURFACE).map((v) => v.symbol)).toEqual([
      VETERAN_UPPER,
    ])
  })

  test("a comment naming the banned reader is not a reference", () => {
    const source = [
      `// Deliberately does NOT call ${DIFFICULTY} — the per-set surface answers this.`,
      `/** ${VETERAN_UPPER} conflates absent with false. */`,
      "export const answer = 1",
    ].join("\n")
    expect(scanPerPieceVeteranReferences(source, OTHER_FILE)).toEqual([])
  })

  test("a longer identifier that merely contains a banned symbol is not a reference", () => {
    const source = `let ${VETERAN_LOWER}Result = false\nexport const r = ${VETERAN_LOWER}Result\n`
    expect(scanPerPieceVeteranReferences(source, OTHER_FILE)).toEqual([])
  })

  test("a file naming neither reader costs nothing and yields nothing", () => {
    expect(scanPerPieceVeteranReferences("export const x = 1\n", OTHER_FILE)).toEqual([])
  })
})

describe("isOutOfScope — path scope", () => {
  test("in scope: first-party ts/tsx", () => {
    expect(isOutOfScope(OTHER_FILE)).toBe(false)
    expect(isOutOfScope("shared/pages-ui/src/thing.tsx")).toBe(false)
  })

  test("out of scope: emitted TSTL bundles under a dist/ tree", () => {
    expect(isOutOfScope("temper/addons/dist/LibSets/LibSets.ts")).toBe(true)
  })

  test("out of scope: declaration files and non-ts sources", () => {
    expect(isOutOfScope("temper/addons/types/eso/generated/index.d.ts")).toBe(true)
    expect(isOutOfScope(`${LIB_SETS_SRC}../package-notes.md`)).toBe(true)
  })

  test("out of scope: installed dependencies", () => {
    expect(isOutOfScope("temper/node_modules/libsets/index.ts")).toBe(true)
  })

  test("out of scope: this gate's own source and unit test", () => {
    expect(
      isOutOfScope(
        "infra/cluster-checks/src/checks/check-lib-sets-per-piece-difficulty-boundary.ts"
      )
    ).toBe(true)
    expect(
      isOutOfScope(
        "infra/cluster-checks/src/checks/check-lib-sets-per-piece-difficulty-boundary.unit.test.ts"
      )
    ).toBe(true)
  })

  test("in scope: a sibling check file is NOT exempt", () => {
    expect(
      isOutOfScope("infra/cluster-checks/src/checks/check-boundary-parse.ts")
    ).toBe(false)
  })
})

describe("the syntax-bundle entry — the rule as the bundle runs it", () => {
  const parse = (rel: string, source: string): ts.SourceFile =>
    ts.createSourceFile(rel, source, ts.ScriptTarget.Latest, true, scriptKindFor(rel))

  const REPO_ROOT = "/planted/tree"

  test("the bundle's registry dispatches it, so the move did not leave it unreached", () => {
    expect(SYNTAX_SCANNER_ENTRIES.map((e) => e.name)).toContain(ENTRY.name)
  })

  test("it refuses all four planted shapes off one shared parse, and passes over the comment", () => {
    const source = [
      `import { ${DIFFICULTY} } from "./helpers"`,
      `const byProperty = LibSets.${VETERAN_UPPER}(setId, itemLink)`,
      `const byStringKey = lib["${VETERAN_UPPER}"](setId, itemLink)`,
      `// naming ${DIFFICULTY} and ${VETERAN_UPPER} in prose is not a reference`,
      `export const called = ${DIFFICULTY}(setData, itemLink, false)`,
    ].join("\n")
    const findings = ENTRY.findFindings(parse(OTHER_FILE, source), REPO_ROOT)
    expect(findings.map((f) => f.line)).toEqual([1, 2, 3, 5])
    expect(findings.every((f) => f.file === OTHER_FILE)).toBe(true)
  })

  test("every finding names the symbol it caught and the sanctioned per-set surface", () => {
    const findings = ENTRY.findFindings(
      parse(OTHER_FILE, `export const x = ${DIFFICULTY}\nexport const y = ${VETERAN_UPPER}\n`),
      REPO_ROOT
    )
    expect(findings.map((f) => f.message.includes(DIFFICULTY))).toEqual([true, false])
    expect(findings.every((f) => f.message.includes(PER_SET_SURFACE))).toBe(true)
  })

  test("it carries no remediation pointer, the package prose it would name having left the repo", () => {
    expect(ENTRY.remediationDoc).toBeUndefined()
  })

  test("its pre-file skip is the same scope predicate the standalone walk filters with", () => {
    expect(ENTRY.preFileSkip?.(OTHER_FILE, REPO_ROOT)).toBe(false)
    expect(ENTRY.preFileSkip?.("temper/addons/dist/LibSets/LibSets.ts", REPO_ROOT)).toBe(
      true
    )
    expect(
      ENTRY.preFileSkip?.(
        "infra/cluster-checks/src/checks/check-lib-sets-per-piece-difficulty-boundary.ts",
        REPO_ROOT
      )
    ).toBe(true)
  })
})
