import type { Finding } from "../finding.page-type.ts"

export const oneChecksRemedyIsRefusedByAnotherCheck = {
  id: "01a0614d-16f2-7ffd-ade3-30e0a20b7691",
  pageTypeSlug: "finding",
  slug: "one-checks-remedy-is-refused-by-another-check",
  domainSlug: "domain/akasha-check",
  claim:
    "`no-rule-in-two-files` asks that a duplicated cast helper go, which turns `export const lib: Lib = asLib({...})` into `export const lib: Lib = {...} as Lib`. `identifier-matches-its-place` then refuses that line, because a constant whose initializer is written out is held to upper snake case and a call expression is not written out. Taking one check's remedy hands you the other check's refusal. The resolution is to rename the constant, not to keep the helper.",
  evidence:
    "`constantsIn` at `identifier-matches-its-place.code-check.code.ts:141-153` collects a `const` whose initializer `writtenOut(heldIn(initializer))` answers true for, and holds its name to `name-format/upper-snake-case`. `heldIn` unwraps `as` and `satisfies` recursively, so `{...} as Lib` is the object literal it wraps and is written out. A `CallExpression` is not, so `asLib({...})` passes.\n\nThe helper is therefore load bearing for a rule that has nothing to do with casting. Removing it, as `no-rule-in-two-files` asks, is what makes the name refuse.\n\nFour libraries met this. `temper-lib-slash-commander` already named its constant `SLASH_COMMANDER` and needed nothing. `temper-lib-alchemy-station` already named its `ALCHEMY_STATION`. `temper-lib-main-menu` and `temper-lib-map-ping` both named theirs `lib` and were renamed to `LIB`, the name `temper-lib-custom-menu/custom-menu-lib` had already given the same value, at `e6b71e1660`. The rename reached three further files in map-ping that import the constant.\n\nThe rename is the right resolution and neither check needs changing for this case. What the two checks together do is make a naming change fall out of a duplication change, with nothing saying so until the write refuses. A seat that reads only the duplication refusal will write the obvious inlining and be told its constant is misnamed, in a file it had no reason to think it was renaming.",
} as const satisfies Finding
