export interface BunPtyTerminal {
  write: (data: string | Uint8Array) => number
  resize: (cols: number, rows: number) => void
  setRawMode: (enabled: boolean) => void
  close: () => void
}

export interface BunPtySpawnOptions {
  cwd: string
  env: Record<string, string | undefined>
  terminal: {
    cols: number
    rows: number
    data: (term: BunPtyTerminal, chunk: Uint8Array) => void
  }
}

export interface BunPtySubprocess {
  readonly terminal: BunPtyTerminal
  readonly exited: Promise<number>
  readonly exitCode: number | null
  readonly signalCode: string | null
  readonly pid: number
  kill: (signal?: number) => void
}

export type BunPtySpawnFn = (cmd: readonly string[], opts: BunPtySpawnOptions) => BunPtySubprocess

function asBunPtySpawnFn(fn: unknown): BunPtySpawnFn {
  return fn as BunPtySpawnFn
}

export const spawnPty: BunPtySpawnFn = asBunPtySpawnFn(Bun.spawn)
