#!/usr/bin/env bun

import { existsSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { ownRepoRoot } from "@akasha/pages-system/checkout-roots"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import { z } from "zod"
import { parseArgs, STANDARD_FLAGS } from "../../modules/cli-args/cli-args.module.code.ts"
import { examineFilePopulation } from "../../modules/population/population.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import {
  BYPASS_PREDICATES,
  BYPASS_SIZE,
  type CheckScript,
  classifyEmission,
  reconcileChokepoint,
} from "../../modules/verdict-emitter-chokepoint/verdict-emitter-chokepoint.module.code.ts"
import {
  exitOnResult,
  exitOnToolError,
} from "../../modules/violation-reporting/violation-reporting.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[verdict-emitter-chokepoint]"
const CHECK_SCRIPTS_DIR = "packages/infra/checks/src/checks"
const CONFIG_FILE =
  "checks/cluster-checks/pages/verdict-emitter-chokepoint/verdict-emitter-chokepoint.config.json"

const CONFIG_SCHEMA = z
  .object({ bypass: z.record(z.string(), z.enum(BYPASS_PREDICATES)).optional() })
  .passthrough()

function toolExit(message: string): never {
  return exitOnToolError({ error: new Error(message), prefix: PREFIX })
}

function checkScriptFiles(root: string): readonly string[] {
  try {
    return readdirSync(join(root, CHECK_SCRIPTS_DIR))
      .filter((f) => f.endsWith(".ts") && !f.endsWith(".test.ts"))
      .sort()
  } catch (err) {
    return toolExit(`could not enumerate ${CHECK_SCRIPTS_DIR}: ${errorMessage(err)}`)
  }
}

async function main(): Promise<never> {
  const parsed = parseArgs(process.argv.slice(2), { ...STANDARD_FLAGS }, { passthrough: true })
  const own = ownRepoRoot()

  const configPath = join(own, CONFIG_FILE)
  if (!existsSync(configPath)) return toolExit(`config not found: ${configPath}`)
  const config = CONFIG_SCHEMA.safeParse(await Bun.file(configPath).json())
  if (!config.success)
    return toolExit(`${CONFIG_FILE} did not match the expected shape: ${config.error.message}`)

  const scripts: CheckScript[] = []
  const { population } = examineFilePopulation({
    files: checkScriptFiles(own),
    unit: "check scripts",
    membership: {
      kind: "enumerated",
      because:
        "`checkScriptFiles` lists `CHECK_SCRIPTS_DIR` with a bare `readdirSync` and turns any failure — " +
        "a missing directory included — into `toolExit`, so it never hands back a short " +
        "listing; fewer members means fewer check scripts in that directory",
    },
    pathOf: (file) => join(own, CHECK_SCRIPTS_DIR, file),
    scan: (file, source) => {
      scripts.push({ file, route: classifyEmission(source) })
      return []
    },
  })

  const { violations, resolved, tally } = reconcileChokepoint({
    scripts,
    bypass: new Map(Object.entries(config.data.bypass ?? {})),
    ratchetCeiling: BYPASS_SIZE,
  })

  const summary = `${tally.scripts} check script(s) all accounted for: ${tally.routed} routed through the emitter, ${tally.bypass} declared bypasses, ${tally.inert} emitting nothing.`

  const drift: readonly string[] =
    resolved.length === 0
      ? [`RATCHET — ${tally.bypass} declared bypasses, none resolved. BYPASS_SIZE agrees.`]
      : [
          `RATCHET — ${resolved.length} bypass entr(ies) already resolved elsewhere and awaiting ` +
            "removal. Dropping them and lowering BYPASS_SIZE by as many is the whole repair. " +
            "Nothing is held on the branch until somebody makes it, and none of these is a " +
            "check script that newly left the emitter:",
          ...resolved.map((r) => `  ${r.file} (${r.kind})`),
        ]

  return exitOnResult({
    violations,
    options: {
      format: parsed.flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `Check scripts whose verdict leaves them outside ${CONFIG_FILE}`,
      successMessage: [`OK — ${summary}`, ...drift.map((l) => `  ${l}`)].join("\n"),
      population,
      formatViolation: (v) => (v.file === undefined ? v.message : `${v.file} — ${v.message}`),
      footer: (count) =>
        [
          `${PREFIX} ${count} violation(s)`,
          `${PREFIX} ${summary}`,
          ...drift.map((l) => `${PREFIX} ${l}`),
        ].join("\n"),
    },
  })
}

await main()
