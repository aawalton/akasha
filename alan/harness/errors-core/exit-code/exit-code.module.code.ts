export const EXIT = {
  OK: 0,
  INPUT: 1,
  DATA: 2,
  OPERATIONAL: 3,
  UNCLASSIFIED: 70,
} as const

export type ExitCode = (typeof EXIT)[keyof typeof EXIT]

export class CliError extends Error {
  constructor(
    message: string,
    readonly code: number
  ) {
    super(message)
    this.name = "CliError"
  }
}

export interface UnknownFlag {
  readonly name: string
  readonly suggestion: string | undefined
}

export class InputError extends Error {
  readonly code: number = EXIT.INPUT
  constructor(
    message: string,
    readonly unknownFlag?: UnknownFlag
  ) {
    super(message)
    this.name = "InputError"
  }
}

export class DataError extends Error {
  readonly code: number = EXIT.DATA
  constructor(message: string) {
    super(message)
    this.name = "DataError"
  }
}

export class OperationalError extends Error {
  readonly code: number = EXIT.OPERATIONAL
  constructor(message: string) {
    super(message)
    this.name = "OperationalError"
  }
}

export function isCliError(e: unknown): e is CliError | InputError | DataError | OperationalError {
  return (
    e instanceof CliError ||
    e instanceof InputError ||
    e instanceof DataError ||
    e instanceof OperationalError
  )
}

export function exitCodeForThrowable(err: unknown): number {
  return isCliError(err) ? err.code : EXIT.UNCLASSIFIED
}

export function inputError(message: string): InputError {
  return new InputError(message)
}

export function dataError(message: string): DataError {
  return new DataError(message)
}

export function operationalError(message: string): OperationalError {
  return new OperationalError(message)
}
