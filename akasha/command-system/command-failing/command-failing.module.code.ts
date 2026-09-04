export function fail(message: string): never {
  process.stderr.write(`error: ${message}\n`)
  process.exit(1)
}
