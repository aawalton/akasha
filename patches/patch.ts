export function fail(reason: string): never {
  process.stderr.write(`error: ${reason}\n`)
  process.exit(1)
}
