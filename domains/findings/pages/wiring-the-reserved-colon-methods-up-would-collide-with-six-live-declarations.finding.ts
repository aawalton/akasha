import type { Finding } from "../finding.page-type.ts"

export const wiringTheReservedColonMethodsUpWouldCollideWithSixLiveDeclarations = {
  id: "01a062d0-a0c5-7bde-8c4f-c364b87f4585",
  pageTypeSlug: "finding",
  slug: "wiring-the-reserved-colon-methods-up-would-collide-with-six-live-declarations",
  domainSlug: "workspace-package/temper-eso-types",
  claim:
    "The eight reserved-colon-method interfaces were never once referenced in their whole life, and connecting them to `Control`, `ButtonControl`, `EditControl` and `SceneFragment` was never available: every member a live caller wants is declared a second time already, in a shape that disagrees. They were deleted rather than connected.",
  evidence:
    "Census at aa07489bf1, one instrument for all eight: 64,151 TypeScript files walked, node_modules included; the two whose text held `ZoReserved` parsed to an AST, and every identifier of those names classified by its parent node. Eight declarations, zero type references, zero heritage clauses, zero import or export specifiers, zero occurrences inside a string or a comment. Seeded before it was believed: a probe extending one name, aliasing a second and writing a third inside a string answered one heritage reference, one type reference and one non-reference. `git log -S` names them at 8f93e35679, which declared them, and 0e69821019, which moved the folder, and nowhere else.\n\nSix of the eighteen members are declared elsewhere already, each disagreeing with the reserved copy. `SetNormalFontColor` and `SetMouseOverFontColor` are on `ButtonControl` at `eso-ui-extra.type-declaration.d.ts:78-79` as `(r, g, b, a: number) => undefined`, against `(r, g, b, a?: number) => void`. `SetSimpleAnchor` and `SetPressedFontColor` are on local interfaces inside temper-housing-addon, each carrying an explicit `this`. `SetAllowShowHideTimeUpdates` and `SetConditional` are on temper-navigation-addon's own scene type, returning `undefined`. `HasFocus` is on `EditControl` at `eso-objects-01.type-declaration.d.ts:193`. `SetDisabledFontColor` is called nowhere.\n\n`declarations-agree` compiles the declaration set against itself without `skipLibCheck`, so a member merged across interfaces has to match exactly. An `extends` clause collides on all six, and reconciling them changes what every `ButtonControl` and `Control` consumer reads.",
} as const satisfies Finding
