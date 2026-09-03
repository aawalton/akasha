import {
  fileReadingFor,
  LOG,
  READER,
  readRulePopulations,
} from "../rule-population-reading/rule-population-reading.module.code.ts"

async function main(): Promise<void> {
  const args = process.argv.slice(2)

  const known = new Set(["--dry-run"])
  for (const one of args) {
    if (known.has(one)) continue
    process.stderr.write(`\`${one}\` is not an argument this takes — run it with --help\n`)
    process.exit(1)
  }

  const log = (line: string): undefined => {
    console.log(line)
    return undefined
  }

  const reading = await readRulePopulations(log)
  log(
    `${LOG} ${reading.emptyCount} empty of ${reading.rulesRead} rule(s) read; one message for \`${READER}\``
  )

  if (args.includes("--dry-run")) {
    process.stdout.write(`${reading.text}\n${LOG} dry run, nothing filed\n`)
    return
  }

  fileReadingFor(reading, log)
}

if (import.meta.main) {
  main().catch((err) => {
    console.error(`${LOG} fatal:`, err instanceof Error ? err.message : err)
    process.exit(1)
  })
}
