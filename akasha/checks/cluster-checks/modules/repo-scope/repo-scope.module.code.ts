// Which repository a check speaks about, and which folders a check does not walk.
//
// This stood at `repo/scope/scope.ts`, where ten files inside akasha reached out to it by a
// relative path and four in `tools/` reached in the same way. It is three constants; the reach
// was the only thing wrong with it.
//
// It carries no import. The `Repo` alias it used to type these with was `string` in the
// markdown document module, and no reader of this file has ever imported the type — every one of
// the fourteen takes `CHECK_EXEMPT_DIRS` or `CODE_REPO` and nothing else. Dropping the alias
// is what lets this stand inside `@akasha/checks`, whose manifest names no pages system.
//
// `INSTRUCTIONS_REPO` came with the other two and went here with nothing reading it, so it is
// not carried on. The name survives in `bare-repo-init` as a shell variable, which is a
// different thing wearing the same spelling.

export const CHECK_EXEMPT_DIRS: ReadonlySet<string> = new Set(["__fixtures__", "generated"])

export const CODE_REPO = "code"
