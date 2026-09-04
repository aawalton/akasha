import type { Finding } from "../finding.page-type.ts"

export const theSavedVariablesPackageReadsTheFileAnAddonWrites = {
  id: "01a060f0-4c37-72c6-8a67-9ebb7c2f8763",
  pageTypeSlug: "finding",
  slug: "the-saved-variables-package-reads-the-file-an-addon-writes",
  domainSlug: "domain/temper",
  claim:
    "`@akasha/temper-saved-variables` is not the home for an addon's own in-game saved state, though the name invites the guess. It is the outside reader of the Lua file the game writes, and its page says so: the game is the only writer. An addon's `saved-variables` module is that writer, compiled to Lua 5.1 for the game's sandbox. Folding one into the other would contradict the package's own invariant and put sandbox code in a package that runs on Node.",
  evidence:
    'Read on 2026-09-02 while deciding where a shared addon saved-state module belongs.\n\n`akasha/temper/temper-saved-variables/temper-saved-variables.workspace-package.ts` defines the package as "the Lua file the game writes an add-on\'s own state into" and carries three invariants: "A saved-variables file is read here without any Lua being run", "The game is the only writer of a saved-variables file", and "What the game wrote is taken as written rather than corrected".\n\nIts four modules are `lua-parser`, `lua-serializer`, `lua-array` and `account-wide` — a parser for a Lua table literal read off disk by a Node process.\n\nWhat an addon\'s `saved-variables` module does is the other side. `temper/player-completion-addon/src/saved-variables.ts` calls `ZO_SavedVars.NewAccountWide`, holds the live table the game hands back, migrates older shapes forward in place, and prunes deleted characters against `GetNumCharacters`. It runs inside the game, is compiled to Lua 5.1, and is the writer the reader\'s invariant names.\n\nThe two also cannot share a runtime. Addon code reaches ESO globals that no Node program has, and the ESO sandbox bars `os`, so nothing addon-reachable may use `Date`.\n\nA separate note for whoever reads the name next: `temper/shared-addon-libraries-lib-saved-vars` is a third thing again, and is neither of these.',
} as const satisfies Finding
