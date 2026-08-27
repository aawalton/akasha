import { describe, expect, test } from "bun:test"
import { type AstGrepRule, decideRuleOutcome, deriveRulePopulations, duplicateRuleIds, globLiteralPrefix, normalizeLanguage, parseRuleDoc, parseWalkedEntities, planAstGrepWatch, reconcilePopulations, stripInspectTrace } from "../../../../tools/lib/check-workflow/ast-grep-rules"

const aRule = (over: Partial<AstGrepRule> & { id: string }): AstGrepRule => ({
  path: `x/rules/${over.id}.yml`,
  language: "ts",
  filesGlobs: [],
  ignoresGlobs: [],
  ...over,
})

describe("parseWalkedEntities", () => {
  test("reads every entity the walk visited, applied or not", () => {
    const stderr = [
      "sg: summary|project: isProject=false",
      "sg: entity|rule|demo: finalSeverity=Error",
      "sg: entity|file|a.ts: language=TypeScript,appliedRuleCount=0",
      "sg: entity|file|b.ts: language=TypeScript,appliedRuleCount=12",
    ].join("\n")
    expect(parseWalkedEntities(stderr)).toEqual([
      { path: "a.ts", language: "TypeScript", appliedRuleCount: 0 },
      { path: "b.ts", language: "TypeScript", appliedRuleCount: 12 },
    ])
  })

  test("one file read as several languages is several entities, not one", () => {
    const stderr = [
      "sg: entity|file|p/x.html: language=Html,appliedRuleCount=1",
      "sg: entity|file|p/x.html: language=Css,appliedRuleCount=0",
      "sg: entity|file|p/x.html: language=JavaScript,appliedRuleCount=0",
    ].join("\n")
    expect(parseWalkedEntities(stderr)).toHaveLength(3)
  })
})

describe("normalizeLanguage", () => {
  test("an abbreviated alias reaches the canonical name ast-grep prints", () => {
    expect(normalizeLanguage("ts")).toBe(normalizeLanguage("TypeScript"))
    expect(normalizeLanguage("yml")).toBe(normalizeLanguage("Yaml"))
  })

  test("a language whose alias IS its name needs no entry", () => {
    expect(normalizeLanguage("python")).toBe(normalizeLanguage("Python"))
  })

  test("two different languages do not collide", () => {
    expect(normalizeLanguage("ts")).not.toBe(normalizeLanguage("tsx"))
  })
})

describe("deriveRulePopulations", () => {
  const entities = [
    { path: "a/src/x.ts", language: "TypeScript", appliedRuleCount: 1 },
    { path: "a/src/x.test.ts", language: "TypeScript", appliedRuleCount: 0 },
    { path: "b/src/y.ts", language: "TypeScript", appliedRuleCount: 1 },
    { path: "a/src/z.tsx", language: "Tsx", appliedRuleCount: 0 },
  ]

  const populationOf = (rule: AstGrepRule): readonly string[] | undefined =>
    deriveRulePopulations([rule], entities).get(rule.path)

  test("a rule's population is its files globs less its ignores", () => {
    const population = populationOf(
      aRule({ id: "r", filesGlobs: ["**/*.ts"], ignoresGlobs: ["**/*.test.ts"] })
    )
    expect(population).toEqual(["a/src/x.ts", "b/src/y.ts"])
  })

  test("a rule with NO files globs reaches every walked file of its language", () => {
    expect(populationOf(aRule({ id: "bare" }))).toHaveLength(3)
  })

  test("a files glob reaching another language matches nothing there", () => {
    expect(
      populationOf(aRule({ id: "r", language: "ts", filesGlobs: ["**/*.tsx"] }))
    ).toEqual([])
  })

  test("a rule whose globs name nothing walked reports an EMPTY population, not an absent one", () => {
    expect(populationOf(aRule({ id: "nowhere", filesGlobs: ["gone/**/*.ts"] }))).toEqual(
      []
    )
  })

  test("a glob with no separator matches the basename at any depth, as ast-grep reads it", () => {
    expect(populationOf(aRule({ id: "bare-glob", filesGlobs: ["*.ts"] }))).toHaveLength(3)
  })

  test("a no-separator ignore reaches the same depth its files glob does", () => {
    const population = populationOf(
      aRule({ id: "r", filesGlobs: ["**/*.ts"], ignoresGlobs: ["*.test.ts"] })
    )
    expect(population).toEqual(["a/src/x.ts", "b/src/y.ts"])
  })

  test("two rule files declaring ONE id keep their populations apart", () => {
    const wide = { ...aRule({ id: "same" }), path: "a/rules/wide.yml" }
    const empty = {
      ...aRule({ id: "same", filesGlobs: ["gone/**/*.ts"] }),
      path: "b/rules/empty.yml",
    }
    const populations = deriveRulePopulations([wide, empty], entities)
    expect(populations.get(wide.path)).toHaveLength(3)
    expect(populations.get(empty.path)).toEqual([])
  })
})

describe("duplicateRuleIds", () => {
  test("rules with distinct ids collide over nothing", () => {
    expect(duplicateRuleIds([aRule({ id: "a" }), aRule({ id: "b" })]).size).toBe(0)
  })

  test("names every file declaring a shared id, so either can be the one renamed", () => {
    const one = { ...aRule({ id: "same" }), path: "a/rules/one.yml" }
    const two = { ...aRule({ id: "same" }), path: "b/rules/two.yml" }
    expect(duplicateRuleIds([one, two]).get("same")).toEqual([one.path, two.path])
  })
})

describe("reconcilePopulations", () => {
  const entities = [
    { path: "a.ts", language: "TypeScript", appliedRuleCount: 2 },
    { path: "b.ts", language: "TypeScript", appliedRuleCount: 0 },
  ]

  test("a derivation accounting for every application agrees", () => {
    const populations = new Map([
      ["one", ["a.ts"]],
      ["two", ["a.ts"]],
    ])
    expect(reconcilePopulations(populations, entities)).toEqual([])
  })

  test("CATCHES a derivation placing fewer rules than ast-grep applied", () => {
    expect(reconcilePopulations(new Map([["one", ["a.ts"]]]), entities)).toEqual([
      { path: "a.ts", language: "TypeScript", derived: 1, observed: 2 },
    ])
  })

  test("CATCHES a derivation placing a rule where ast-grep applied none", () => {
    const populations = new Map([
      ["one", ["a.ts", "b.ts"]],
      ["two", ["a.ts"]],
    ])
    expect(reconcilePopulations(populations, entities)).toEqual([
      { path: "b.ts", language: "TypeScript", derived: 1, observed: 0 },
    ])
  })

  test("CATCHES a derivation reaching a path the walk never visited", () => {
    const populations = new Map([["one", ["a.ts", "a.ts", "gone.ts"]]])
    expect(reconcilePopulations(populations, entities)).toContainEqual({
      path: "gone.ts",
      language: "not walked",
      derived: 1,
      observed: 0,
    })
  })

  test("a multi-language file is reconciled on its path total, not per entity", () => {
    const html = [
      { path: "x.html", language: "Html", appliedRuleCount: 1 },
      { path: "x.html", language: "Css", appliedRuleCount: 0 },
    ]
    expect(reconcilePopulations(new Map([["one", ["x.html"]]]), html)).toEqual([])
  })
})

describe("stripInspectTrace", () => {
  test("drops the per-file trace but keeps ast-grep's own error text", () => {
    const stderr = [
      "sg: summary|project: isProject=false",
      "sg: entity|file|a.ts: language=TypeScript,appliedRuleCount=0",
      "Error: Rule not found: nope",
      "Help: check the id",
    ].join("\n")
    expect(stripInspectTrace(stderr)).toBe("Error: Rule not found: nope\nHelp: check the id")
  })

  test("a trace-only stderr strips to nothing", () => {
    expect(stripInspectTrace("sg: entity|file|a.ts: appliedRuleCount=1")).toBe("")
  })
})

describe("globLiteralPrefix", () => {
  test("returns the directory prefix before the first wildcard", () => {
    expect(globLiteralPrefix("alanwalton/web/app/**/*.ts")).toBe("alanwalton/web/app")
  })

  test("a repo-wide glob has a prefix that reaches no package", () => {
    expect(globLiteralPrefix("**/*.ts")).toBe("")
  })

  test("a glob with no wildcard is its own prefix directory", () => {
    expect(globLiteralPrefix("infra/cluster-checks/src/lib/x.ts")).toBe(
      "infra/cluster-checks/src/lib"
    )
  })
})

describe("planAstGrepWatch", () => {
  const workspaces = [
    { name: "@infra/workspace-cli", dir: "infra/workspace-cli" },
    { name: "@infra/cluster-checks", dir: "infra/cluster-checks" },
  ]

  test("maps a package-scoped glob to its owning package seed", () => {
    expect(
      planAstGrepWatch(
        [aRule({ id: "r", path: "p/rules/r.yml", filesGlobs: ["infra/cluster-checks/src/lib/x*.ts"] })],
        workspaces
      )
    ).toEqual({ seeds: ["package:code:@infra/cluster-checks"], repoWide: false })
  })

  test("de-duplicates and sorts seeds across rules", () => {
    const plan = planAstGrepWatch(
      [
        aRule({ id: "a", path: "p/rules/a.yml", filesGlobs: ["infra/cluster-checks/src/**/*.ts"] }),
        aRule({ id: "b", path: "p/rules/b.yml", filesGlobs: ["infra/cluster-checks/src/lib/*.ts"] }),
        aRule({ id: "c", path: "p/rules/c.yml", filesGlobs: ["infra/workspace-cli/src/*.ts"] }),
      ],
      workspaces
    )
    expect(plan.seeds).toEqual(["package:code:@infra/cluster-checks", "package:code:@infra/workspace-cli"])
  })

  test("a glob too broad to name a package WIDENS the watch set instead of narrowing it", () => {
    const plan = planAstGrepWatch(
      [aRule({ id: "wide", path: "p/rules/wide.yml", filesGlobs: ["**/*.ts"] })],
      workspaces
    )
    expect(plan.repoWide).toBe(true)
  })

  test("a rule with no files globs at all reaches the whole tree, so the plan is repo-wide", () => {
    expect(
      planAstGrepWatch([aRule({ id: "bare", path: "p/rules/bare.yml", filesGlobs: [] })], workspaces)
    ).toEqual({ seeds: [], repoWide: true })
  })

  test("one repo-wide rule alongside package-scoped ones makes the whole plan repo-wide", () => {
    const plan = planAstGrepWatch(
      [
        aRule({ id: "a", path: "p/rules/a.yml", filesGlobs: ["infra/cluster-checks/src/**/*.ts"] }),
        aRule({ id: "wide", path: "p/rules/wide.yml", filesGlobs: ["**/*.tsx"] }),
      ],
      workspaces
    )
    expect(plan).toEqual({ seeds: ["package:code:@infra/cluster-checks"], repoWide: true })
  })
})

describe("parseRuleDoc", () => {
  test("reads the four fields the route decides a population from", () => {
    const doc = parseRuleDoc(
      'id: my-rule\nlanguage: ts\nfiles:\n  - "src/**/*.ts"\nignores:\n  - "**/*.test.ts"\n',
      "r.yml"
    )
    expect(doc).toEqual({
      id: "my-rule",
      path: "r.yml",
      language: "ts",
      filesGlobs: ["src/**/*.ts"],
      ignoresGlobs: ["**/*.test.ts"],
    })
  })

  test("a rule with no files or ignores key yields no globs rather than guessing one", () => {
    const doc = parseRuleDoc("id: my-rule\nlanguage: ts\n", "r.yml")
    expect(doc.filesGlobs).toEqual([])
    expect(doc.ignoresGlobs).toEqual([])
  })

  test("REFUSES a rule document with no id", () => {
    expect(() => parseRuleDoc("language: ts\n", "r.yml")).toThrow(/r\.yml/)
  })

  test("REFUSES a rule document with no language, which no population can be derived without", () => {
    expect(() => parseRuleDoc("id: my-rule\n", "r.yml")).toThrow(/r\.yml/)
  })
})

describe("decideRuleOutcome", () => {
  const demo = aRule({ id: "demo", filesGlobs: ["x/**/*.ts"] })
  const finding = { ruleId: "demo", file: "x/a.ts", line: 41, message: "bad thing" }

  test("a non-empty population with no findings passes", () => {
    expect(decideRuleOutcome({ rule: demo, populationSize: 18, findings: [] })).toEqual([])
  })

  test("an EMPTY population is a violation, not a pass", () => {
    const violations = decideRuleOutcome({ rule: demo, populationSize: 0, findings: [] })
    expect(violations).toHaveLength(1)
    expect(violations[0]?.message).toMatch(/matched no files/)
  })

  test("an empty population is refused even on the run where the rule found something", () => {
    const violations = decideRuleOutcome({ rule: demo, populationSize: 0, findings: [finding] })
    expect(violations).toHaveLength(1)
    expect(violations[0]?.message).toMatch(/matched no files/)
  })

  test("each finding is sited at its own file and carries its rule's id", () => {
    const violations = decideRuleOutcome({ rule: demo, populationSize: 18, findings: [finding] })
    expect(violations).toEqual([
      { file: "x/a.ts", line: 42, message: "ast-grep rule `demo`: bad thing" },
    ])
  })
})
