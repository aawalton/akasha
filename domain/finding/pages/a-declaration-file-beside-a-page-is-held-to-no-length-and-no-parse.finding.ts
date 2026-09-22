import type { Finding } from "akasha/domain/finding/finding.page-type.types.ts"

export const aDeclarationFileBesideAPageIsHeldToNoLengthAndNoParse = {
  id: "01a0ca85-63dd-7876-abba-9b45be7d4c98",
  type: "page-type/finding",
  slug: "a-declaration-file-beside-a-page-is-held-to-no-length-and-no-parse",
  domain: "domain/check",
  claim:
    "A `.type-declaration.d.ts` beside a page is held to no length ceiling and to nothing that reads it as TypeScript. Four are over the ceiling today, the largest nine times over. A mechanical writer landed a body that was not TypeScript at all and every check passed it.",
  evidence:
    "Measured 2026-09-22. `code/type-declaration/properties/ambient-types.file-property.ts:10` states `runsFileLength: false`, so the file-length check never judges one of these files. Four are past the 15000 byte ceiling: `vscode-api.type-declaration.d.ts` at 137810, `sets-api` at 23674, `scrollable-menu-library-shapes` at 19768 and `eso-ui` at 15601.\n\nThe parse gap was found by a mechanical writer falling into it rather than by reading. While the ESO declaration generator was being retargeted, a narrowing rule dropped the head line of `interface StatusBarControl extends Control {` and left its 26 members and the closing brace behind. The body landed. A formatter then joined two of the orphans into `ClearFadeOutLossAdjustedTopValue: () => void EnableFadeOut`, which is not TypeScript. It was found by re-running the generator, not by a check.\n\nSo the exemption is wider than length. Nothing reads one of these files as code, which is the opposite of what the file is for: it is the authority for what a global name's type is, and an unparseable one silently stops typechecking every name it declares.\n\nA related consequence, worth holding beside this: the 32 generated declaration pages were divided into chunks whose boundaries no packing rule reproduces, several of them well short of any ceiling. That division was never under any pressure from a check, because no check was watching, which is the likeliest explanation for boundaries nothing else explains.\n\nNot established. Whether `runsFileLength: false` was set for the vendored `vscode-api` file alone and then reached the whole class, and whether the mend is a parse check over this file kind, a ceiling that admits a stated exception, or both.",
} as const satisfies Finding
