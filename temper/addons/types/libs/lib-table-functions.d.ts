interface TemperTableFunctions {
  CopyTable: <T>(this: TemperTableFunctions, origTable: T) => T

  SortTable: <T>(this: TemperTableFunctions, origTable: T, column?: number) => T

  SimpleResetTable: <T>(this: TemperTableFunctions, origTable: T, value: unknown) => T
}

declare const TemperTableFunctions: TemperTableFunctions
