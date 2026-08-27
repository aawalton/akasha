import { describe, expect, it } from "bun:test"
import ts from "typescript"
import { scanPopulationReadSwallow } from "./ts-population-read-swallow.ts"

const POPULATION_IMPORT = `import { examineFilePopulation } from "../../../../tools/lib/check-workflow/population"\n`

function scan(body: string, opts?: { readonly declaresPopulation?: boolean }) {
  const source = (opts?.declaresPopulation === false ? "" : POPULATION_IMPORT) + body
  const sf = ts.createSourceFile(
    "check-x.ts",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  )
  return scanPopulationReadSwallow(sf)
}

const READ_TO_FILTER = `
const files: string[] = []
for (const rel of enumerated) {
  let source: string
  try {
    source = readFileSync(rel, "utf-8")
  } catch {
    continue
  }
  if (source.includes("@generated")) continue
  files.push(rel)
}
const { population, violations } = examineFilePopulation({ files, unit: "files", scan })
`

const SCAN_SAYS_OUT_OF_SCOPE = `
const { population, violations } = examineFilePopulation({
  files: enumerated.filter((rel) => !isExcludedByPath(rel)),
  unit: "files",
  pathOf: (rel) => join(repoRoot, rel),
  scan: (rel, source) => (isExcludedBySource(rel, source) ? [] : scanRawPagesSql(sf(rel, source))),
})
`

describe("scanPopulationReadSwallow — the drop one line above the construction", () => {
  it("fires on the read-to-filter shape", () => {
    const findings = scanPopulationReadSwallow(
      ts.createSourceFile(
        "check-x.ts",
        POPULATION_IMPORT + READ_TO_FILTER,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TS
      )
    )
    expect(findings.length).toBe(1)
    expect(findings[0]?.file).toBe("check-x.ts")
    expect(findings[0]?.reason).toContain("continue")
  })

  it("does not fire on the correct route, where the caller performs no read", () => {
    expect(scan(SCAN_SAYS_OUT_OF_SCOPE)).toEqual([])
  })

  it("fires on an empty catch, which resumes by falling out of it", () => {
    expect(scan(`try { source = readFileSync(p, "utf-8") } catch {}`).length).toBe(1)
  })

  it("fires on break, which drops every remaining member as well", () => {
    expect(
      scan(`for (const p of ps) { try { readFileSync(p, "utf-8") } catch { break } }`).length
    ).toBe(1)
  })

  it("fires on a conditional throw before a continue, because that still resumes", () => {
    expect(
      scan(
        `try { readFileSync(p, "utf-8") } catch (err) { if (isFatal(err)) throw err
         continue }`
      ).length
    ).toBe(1)
  })

  it("fires on a statSync probe, which fails for a member exactly as a read does", () => {
    expect(
      scan(`for (const abs of paths) { try { st = statSync(abs) } catch { continue } }`).length
    ).toBe(1)
  })

  it("fires on a bare return, which resumes an enclosing walk just as continue does", () => {
    expect(
      scan(`function walk(dir) { try { entries = readdirSync(dir) } catch { return } }`).length
    ).toBe(1)
  })

  it("fires when the read reaches the try through a same-file helper", () => {
    expect(
      scan(`
function readSource(p: string): string { return readFileSync(p, "utf-8") }
for (const p of ps) {
  try { readSource(p) } catch { continue }
}
`).length
    ).toBe(1)
  })

  it("fires on a file that imports the general constructor rather than the file one", () => {
    const body = `import { examinePopulation } from "../../../../tools/lib/check-workflow/population"
for (const p of ps) {
  try { readFileSync(p, "utf-8") } catch { continue }
}
`
    const sf = ts.createSourceFile(
      "check-x.ts",
      body,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS
    )
    expect(scanPopulationReadSwallow(sf).length).toBe(1)
  })
})

describe("scanPopulationReadSwallow — the ends that are honest", () => {
  it("accepts a rethrow", () => {
    expect(scan(`try { readFileSync(p, "utf-8") } catch (err) { throw err }`)).toEqual([])
  })

  it("accepts process.exit", () => {
    expect(
      scan(`try { readFileSync(p, "utf-8") } catch (err) { console.error(err)
      process.exit(2) }`)
    ).toEqual([])
  })

  it("accepts a returned exitOnResult, which reports a verdict and does not come back", () => {
    expect(
      scan(
        `try { readFileSync(p, "utf-8") } catch (err) { return exitOnResult({ violations: [], options: { prefix: PREFIX, population } }) }`
      )
    ).toEqual([])
  })

  it("ignores a catch whose try performs no read", () => {
    expect(scan(`try { flags = parseArgs(argv, SPEC) } catch { flags = DEFAULTS }`)).toEqual([])
  })
})

describe("scanPopulationReadSwallow — scope is the import", () => {
  it("ignores the identical swallow in a file that declares no population", () => {
    expect(scan(READ_TO_FILTER, { declaresPopulation: false })).toEqual([])
  })

  it("fires on Bun.file and readdirSync alike", () => {
    expect(scan(`try { await Bun.file(p).text() } catch { continue }`).length).toBe(1)
    expect(scan(`try { readdirSync(d) } catch { continue }`).length).toBe(1)
  })

  it("reports the catch's own position, not the try's", () => {
    const findings = scan(`try {\n  readFileSync(p, "utf-8")\n} catch {\n  continue\n}`)
    expect(findings[0]?.line).toBe(4)
  })
})

describe("scanPopulationReadSwallow — a run-ending call is recognized by its declared type", () => {
  const NEVER_HELPER = `function toolExit(message: string): never {\n  return exitOnToolError({ error: new Error(message), prefix: PREFIX })\n}\n`
  const RESUMING_HELPER = `function recover(message: string): readonly string[] {\n  return []\n}\n`

  it("accepts a call to a same-file helper declared to return never", () => {
    expect(
      scan(`${NEVER_HELPER}try { readdirSync(d) } catch (err) { return toolExit(String(err)) }`)
    ).toEqual([])
  })

  it("still fires when the same-file helper returns something, so control comes back", () => {
    expect(
      scan(`${RESUMING_HELPER}try { readdirSync(d) } catch (err) { return recover(String(err)) }`)
        .length
    ).toBe(1)
  })

  it("still fires on a call to a helper this file does not declare at all", () => {
    expect(scan(`try { readdirSync(d) } catch (err) { return giveUp(String(err)) }`).length).toBe(1)
  })

  it("accepts a never-returning arrow helper, since the annotation is what is read", () => {
    const arrow = `const bail = (m: string): never => { throw new Error(m) }\n`
    expect(scan(`${arrow}try { readdirSync(d) } catch (err) { return bail(String(err)) }`)).toEqual(
      []
    )
  })
})

describe("scanPopulationReadSwallow — both reporting exits end a run", () => {
  it("accepts a catch ending in exitOnToolError", () => {
    expect(
      scan(`try { readFileSync(p, "utf-8") } catch (err) { exitOnToolError({ error: err }) }`)
    ).toEqual([])
  })
})
