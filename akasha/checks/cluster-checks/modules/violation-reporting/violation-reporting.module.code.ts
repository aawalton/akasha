import {
  renderBound,
  renderShortfall,
} from "../cluster-population-bound/cluster-population-bound.module.code.ts"
import {
  type Population,
  populationCertifies,
  populationCoverage,
} from "../population/population.module.code.ts"
import type { RemediationDoc } from "../remediation-doc/remediation-doc.module.code.ts"

export interface Violation {
  message?: string
  file?: string
  line?: number
}

export interface WriteSink {
  write: (chunk: string | Uint8Array) => boolean
}

export interface ReportOptions<V extends Violation = Violation> {
  format?: "human" | "json"
  prefix?: string
  header?: string
  footer?: (count: number) => string
  successMessage?: string
  remediationDoc?: RemediationDoc
  groupBy?: (violation: V) => string
  formatViolation?: (violation: V) => string
  stream?: WriteSink
  errorStream?: WriteSink
  population: Population
}

const defaultFormat = (v: Violation): string => {
  const msg = v.message ?? ""
  if (v.file != null && v.line !== undefined)
    return msg.length > 0 ? `${v.file}:${v.line} ${msg}` : `${v.file}:${v.line}`
  if (v.file != null) return msg.length > 0 ? `${v.file} — ${msg}` : v.file
  return msg
}

const defaultFooter =
  (prefix: string | undefined, doc: RemediationDoc | undefined) =>
  (count: number): string => {
    const tag = prefix != null ? `${prefix} ` : ""
    if (doc != null) return `${tag}${count} violation(s) found → see ${doc}`
    return `${tag}${count} violation(s) found.`
  }

function writeLine(stream: WriteSink, line: string): undefined {
  stream.write(`${line}\n`)
}

export function reportViolations<V extends Violation>(
  violations: readonly V[],
  options: ReportOptions<V>
): undefined {
  const stream = options.stream ?? process.stdout
  const format = options.format ?? "human"
  const bound = renderBound(options.population)

  if (format === "json") {
    for (const v of violations) writeLine(stream, JSON.stringify(v))
    const errorStream = options.errorStream ?? process.stderr
    writeLine(errorStream, JSON.stringify({ coverage: populationCoverage(options.population) }))
    return
  }

  const prefix = options.prefix
  const tag = prefix != null ? `${prefix} ` : ""

  const certifies = populationCertifies(options.population)
  if (!certifies) {
    writeLine(
      stream,
      `${tag}NO VERDICT — ${violations.length} violation(s) among the members this run examined, and it did not get through its population, so it certifies nothing. ${bound}`
    )
  }

  if (violations.length === 0) {
    if (certifies) {
      writeLine(stream, `${tag}${options.successMessage ?? "0 violation(s) found."} ${bound}`)
    }
  } else {
    if (options.header != null) writeLine(stream, `${tag}${options.header}:\n`)

    const fmt = options.formatViolation ?? defaultFormat
    if (options.groupBy) {
      const groups = new Map<string, V[]>()
      for (const v of violations) {
        const key = options.groupBy(v)
        const list = groups.get(key) ?? []
        list.push(v)
        groups.set(key, list)
      }
      for (const [key, list] of groups) {
        writeLine(stream, `  ${key}:`)
        for (const v of list) writeLine(stream, `    - ${fmt(v)}`)
        writeLine(stream, "")
      }
    } else {
      for (const v of violations) writeLine(stream, `  - ${fmt(v)}`)
      writeLine(stream, "")
    }

    const footer = options.footer ?? defaultFooter(prefix, options.remediationDoc)
    writeLine(stream, `${footer(violations.length)} ${bound}`)
  }

  for (const line of renderShortfall(options.population, tag)) writeLine(stream, line)
}

export const EXIT_CLEAN = 0
export const EXIT_VIOLATIONS = 1
export const EXIT_TOOL_ERROR = 2

export function computeExitCode(args: {
  violationCount: number
  population: Population
}): 0 | 1 | 2 {
  if (!populationCertifies(args.population)) return EXIT_TOOL_ERROR
  return args.violationCount === 0 ? EXIT_CLEAN : EXIT_VIOLATIONS
}

export function exitOnResult<V extends Violation>(args: {
  violations: readonly V[]
  options: ReportOptions<V>
}): never {
  const code = computeExitCode({
    violationCount: args.violations.length,
    population: args.options.population,
  })
  reportViolations(args.violations, args.options)
  process.exit(code)
}

export function exitOnToolError(args: { error: unknown; prefix?: string }): never {
  const tag = args.prefix != null ? `${args.prefix} ` : ""
  const msg = args.error instanceof Error ? args.error.message : String(args.error)
  process.stderr.write(`${tag}${msg}\n`)
  process.exit(EXIT_TOOL_ERROR)
}
