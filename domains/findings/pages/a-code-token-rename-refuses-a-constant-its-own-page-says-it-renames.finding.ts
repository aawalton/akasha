import type { Finding } from "../finding.page-type.ts"

export const aCodeTokenRenameRefusesAConstantItsOwnPageSaysItRenames = {
  id: "01a08325-f8e0-7000-8fa7-9eb4dd84f78b",
  pageTypeSlug: "finding",
  slug: "a-code-token-rename-refuses-a-constant-its-own-page-says-it-renames",
  domain: "change-agent/rename-code-token",
  claim:
    "`rename-code-token` states it renames a name a code file declares whether that name is exported or not, and it refuses every name a file declares that is not exported.",
  evidence:
    "The page states that this change renames a name a code file declares, exported or not. Drafting it over the constant `WAKE_DAY` at line 8 of `day-messages-totalling.module.code.ts`, which that file declares without exporting, refused with `WAKE_DAY is bound by the file rather than locally`. That text is written at line 223 of `rename-local-variable.change-mechanical-file-content.code.ts`, which refuses wherever `ts.isSourceFile(bound.scope)`, so every name declared at the top of a file is refused rather than only a local one. The same draft over the exported `WAKE_DAY` in `day-opening.module.code.ts` and in `day-place.module.code.ts` was answered and carried the importers with it, so the act depends on the export rather than on the declaration. The two constants it refused were renamed in `b45d40f60f` and `6c8fd8de98` by `change-file` over the declaration and each use by hand instead.",
} as const satisfies Finding
