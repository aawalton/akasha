export interface Logger {
  info: (msg: string) => void
  warn: (msg: string) => void
}

export function stderrLogger(opts: { silent?: boolean } = {}): Logger {
  if (opts.silent) return silentLogger
  return {
    info: (msg) => process.stderr.write(`${msg}\n`),
    warn: (msg) => process.stderr.write(`warn: ${msg}\n`),
  }
}

export const silentLogger: Logger = {
  info: () => {},
  warn: () => {},
}
