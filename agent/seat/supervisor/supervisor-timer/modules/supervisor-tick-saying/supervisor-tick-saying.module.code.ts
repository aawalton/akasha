export interface TickSaying<Kind> {
  readonly note: (kind: Kind, line: string) => undefined
  readonly marked: (kind: Kind) => undefined
}

export function tickSaying<Kind>(start: Kind, log?: (line: string) => void): TickSaying<Kind> {
  let last = start
  return {
    note: (kind: Kind, line: string): undefined => {
      if (kind !== last) log?.(line)
      last = kind
    },
    marked: (kind: Kind): undefined => {
      last = kind
    },
  }
}
