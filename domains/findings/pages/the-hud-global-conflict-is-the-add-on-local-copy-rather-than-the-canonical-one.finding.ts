import type { Finding } from "../finding.page-type.ts"

export const theHudGlobalConflictIsTheAddOnLocalCopyRatherThanTheCanonicalOne = {
  id: "01a063b0-9dac-7a9c-9bf3-f90c3f49ce0f",
  pageTypeSlug: "finding",
  slug: "the-hud-global-conflict-is-the-add-on-local-copy-rather-than-the-canonical-one",
  domainSlug: "workspace-package/temper-addon-library-types",
  claim:
    "The `TemperHud` TS2403 is drawn by an add-on-local `declare global` narrower than the canonical one, and the legacy add-on misses it only because its own tsconfig omits `temper-addon-library-types`. A recreation cannot omit it: the synthesized settings inject that package unconditionally. The mend is to drop the local copy, and no call site changes.",
  evidence:
    "Measured with the TypeScript compiler API over `temper/catalog-addon/src` four ways. With `temper-eso-types` alone the program reads 186 files and draws no TS2403. Adding `temper-addon-library-types` takes it to 238 and draws exactly one, at `main.ts:38`: `Variable 'TemperHud' must be of type 'TemperHudApi | undefined'`. A seeded `const seededControl: number = \"nope\"` draws TS2322 in every seeded run and none of the clean ones.\n\nThe local copy declares one member. The canonical `TemperHudApi` at `akasha/temper/temper-addon-library-types/temper-hud-global/temper-hud-global.type-declaration.d.ts` declares six. Its `registerCommand` signature matches the local one, `name`, `description`, `addon` and an optional `handler`, each with `this: void`. The only reach is `globalThis.TemperHud?.registerCommand({ name, description, addon })` at `main.ts:267`, passing no handler, which the canonical type takes unchanged.\n\nA recreation cannot avoid the meeting. `DECLARATIONS_UNDER` at `akasha/temper/temper-addon-build/addon-tstl-config/addon-tstl-config.module.code.ts:27-30` names both typing packages, and line 169 appends them to every synthesized include list whatever the manifest says.\n\n`skipLibCheck` does not hide this one. It is drawn with lib checking on, the second declaration being in a `.module.code.ts` rather than a `.d.ts`. A duplicate is swallowed only where both sides are declaration files.",
} as const satisfies Finding
