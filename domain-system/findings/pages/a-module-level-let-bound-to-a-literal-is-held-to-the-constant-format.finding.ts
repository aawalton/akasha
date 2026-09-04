import type { Finding } from "../finding.page-type.ts"

export const aModuleLevelLetBoundToALiteralIsHeldToTheConstantFormat = {
  id: "01a061e0-9f1c-7000-9f0b-a7cd07968973",
  pageTypeSlug: "finding",
  slug: "a-module-level-let-bound-to-a-literal-is-held-to-the-constant-format",
  domainSlug: "domain/temper",
  claim:
    "`identifier-matches-its-place` judges a module-level `let` as a constant whenever that `let` carries a literal initializer, so ordinary mutable module state is refused for not being upper snake case. The same `let` carrying a type annotation and no initializer is passed over. The remedy the message points at is to rename mutable state in the constant format, which is the wrong move; what keeps the name honest is dropping the initializer. Every add-on holding an initialization flag meets this.",
  evidence:
    "Measured on 2026-09-02 landing `temper-hud-addon`. `constantsIn` at `akasha/checks/code-checks/pages/identifier-matches-its-place/identifier-matches-its-place.code-check.code.ts:161-173` walks `source.statements` for `ts.isVariableStatement` with no test of `NodeFlags.Const`, so `let` and `var` enter on the same footing as `const`. Line 168 is `if (one.initializer === undefined) continue`, which is the whole of what spares an annotated declaration. Line 169 admits the name when `writtenOut(heldIn(one.initializer))` holds, and `writtenOut` at :84-95 counts `TrueKeyword` and `FalseKeyword` among the literals. So `let initialized = false` is judged. It was refused in one write, on `hud-addon-hide-init.module.code.ts` line 18, as a constant not written in `name-format/upper-snake-case`. In the same commit `let container: Control | undefined` in `hud-addon-bar` and `let savedVarsInstance: HudSavedVariables | undefined` in `hud-addon-saved-variables` passed unrefused, and both are module-level mutable state of the same kind. The landed fix was `let initialized: boolean | undefined` read as `initialized === true`. The check's page states `A name bound at the top of a file to a literal is judged as a constant.` and says nothing of `let`.",
} as const satisfies Finding
