#!/usr/bin/env bun

import { readFileSync } from "node:fs"
import { findFiles } from "../../../../tools/lib/check-workflow/file-finder"
import { examinePopulation, type Population } from "../../../../tools/lib/check-workflow/population"
import { getRepoRoot } from "../lib/repo-root.ts"
import {
  type DimensionLiteral,
  findDimensionLiterals,
  findScaleDrift,
  judgeLiterals,
  type SpacingViolation,
} from "../lib/spacing-scale.ts"
import { exitOnResult, exitOnToolError } from "../../../../tools/lib/check-workflow/violation-reporter"
import {
  deriveSeamJoins,
  deriveWidgetSites,
  describeWidgetScope,
  disposeWidgetSites,
  isJudged,
  judgeWidgetScope,
  SPACING_SWIFT_BASENAME,
  WIDGET_SEAM_GLOB,
  WIDGET_SOURCE_GLOBS,
  WIDGETS_OUTSIDE_THE_SCALE,
  type WidgetScopeViolation,
  type WidgetSite,
} from "../lib/widget-sites.ts"

type ReportedViolation = SpacingViolation | WidgetScopeViolation

const PREFIX = "[spacing-scale]"

const TOKENS_CSS_REL = "shared/design-system/src/styles/tokens.css"

const HEADER = `Every Spacing.swift must mirror the --spacing-* scale in ${TOKENS_CSS_REL}, no other source of a judged widget directory may write a dimension as a number, and every widget directory in the tree either states the scale, takes it from the extensions it compiles into, or is declared out by name`
const SUCCESS =
  "The spacing scale matches across tokens.css and every Spacing.swift stating it, every source of every judged widget directory takes its gaps by name, and no widget directory is left unaccounted for."

function report(args: {
  violations: readonly ReportedViolation[]
  population: Population
  scope: string
}): never {
  exitOnResult<ReportedViolation>({
    violations: args.violations,
    options: {
      population: args.population,
      prefix: PREFIX,
      header: `${HEADER}\n${args.scope}`,
      successMessage: `${SUCCESS}\n${args.scope}`,
      formatViolation: (v) => v.message,
    },
  })
}

function main(): undefined {
  const repoRoot = getRepoRoot()

  let cssText: string
  try {
    cssText = readFileSync(`${repoRoot}/${TOKENS_CSS_REL}`, "utf-8")
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }

  const sites = deriveWidgetSites(
    findFiles({ cwd: repoRoot, patterns: WIDGET_SOURCE_GLOBS, absolute: false })
  )

  const joins = deriveSeamJoins(
    findFiles({ cwd: repoRoot, patterns: [WIDGET_SEAM_GLOB], absolute: false }).map((path) => ({
      path,
      text: readFileSync(`${repoRoot}/${path}`, "utf-8"),
    }))
  )

  const dispositions = disposeWidgetSites({
    sites,
    joins,
    declarations: WIDGETS_OUTSIDE_THE_SCALE,
  })

  const literals: DimensionLiteral[] = []
  const drift: SpacingViolation[] = []
  const scannedSources = new Map<string, number>()

  const { population } = examinePopulation<WidgetSite, never>({
    members: sites,
    unit: "widget directories",
    membership: {
      kind: "enumerated",
      because:
        "the members are the directories `findFiles` found widget sources in, and it globs " +
        "the repo root with `Bun.Glob.scanSync`, which raises ENOENT on a root that is not " +
        "there rather than returning nothing — so fewer members means fewer directories " +
        "holding Swift, and none arriving at all is a tool error before this point",
    },
    labelOf: (site) => site.dir,
    siteOf: (site) => `${repoRoot}/${site.dir}`,
    examine: (site) => {
      const disposition = dispositions.get(site.dir)
      if (disposition === undefined || !isJudged(disposition)) return []
      let scanned = 0
      for (const rel of site.sources) {
        const source = readFileSync(`${repoRoot}/${rel}`, "utf-8")
        if (rel === `${site.dir}/${SPACING_SWIFT_BASENAME}`) {
          drift.push(...findScaleDrift(cssText, source))
          continue
        }
        literals.push(...findDimensionLiterals(rel.split("/").pop() ?? rel, source))
        scanned += 1
      }
      scannedSources.set(site.dir, scanned)
      return []
    },
  })

  const scope = judgeWidgetScope({ sites, joins, declarations: WIDGETS_OUTSIDE_THE_SCALE })

  report({
    violations: [...drift, ...judgeLiterals(literals), ...scope],
    population,
    scope: describeWidgetScope({
      sites,
      joins,
      declarations: WIDGETS_OUTSIDE_THE_SCALE,
      scannedSources,
    }),
  })
}

main()
