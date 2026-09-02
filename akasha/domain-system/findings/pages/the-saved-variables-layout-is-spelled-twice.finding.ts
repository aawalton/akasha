import type { Finding } from "../finding.page-type.ts"

export const theSavedVariablesLayoutIsSpelledTwice = {
  id: "01a06070-0ac4-7f42-86dd-6cf326517caf",
  pageTypeSlug: "finding",
  slug: "the-saved-variables-layout-is-spelled-twice",
  domainSlug: "domain/temper",
  claim:
    "The in-game library that writes SavedVariables and the out-of-game package that reads them each spell the on-disk layout out by hand, and neither reads the other. The two are not duplicates and must not be merged, since one compiles to Lua inside the client and the other runs in Bun. What is duplicated is the agreement about the path shape, which no page states.",
  evidence:
    "temper/shared-addon-libraries-lib-saved-vars is compiled to Lua 5.1 and wraps the game's own ZO_SavedVars: src/saved-vars-manager-core.ts calls sv.NewAccountWide and sv.New, and src/protected.ts walks a live Lua table by table, profile, display name, player key and namespace, writing the literal `Default` for a missing profile and the literal `$AccountWide` for the account-wide player key. It holds no parser and no serializer. temper/shared-saved-variables is a Bun package that parses and writes the file as text: src/lua-parser.ts, src/lua-serializer.ts, src/lua-array.ts and src/saved-variables-account-wide.ts, the last of which hardcodes `Default`, `$AccountWide` and the `@` prefix that marks an account key in a zod schema. src/lib-core.ts tests that same `@` prefix. Neither package can call the other. akasha/temper/temper-watcher reads the files from outside as well, and akasha/temper/temper-saved-variables has landed for the outside reader.",
} as const satisfies Finding
