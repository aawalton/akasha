declare var AsyncSavedVars:
  | import("../async-types/async-types.module.code.ts").AsyncSavedVarsTable
  | undefined

declare var InitSavedVar: (this: void) => void
