import type { Finding } from "../finding.page-type.ts"

export const anInlineSetHandlerCallbackInfersEveryParameterAsNever = {
  id: "01a06182-8490-7417-9afb-94b1dbdee3d7",
  pageTypeSlug: "finding",
  slug: "an-inline-set-handler-callback-infers-every-parameter-as-never",
  domainSlug: "domain/temper",
  claim:
    "`Control.SetHandler` in `temper-eso-types/eso-ui` types its handler `((this: void, ...args: never[]) => void) | undefined`. That accepts any handler, which is what it is for, but it also means an inline arrow written at the call site infers every parameter as `never`. Narrowing one then yields `never`, and the first arithmetic on it fails with a type error that names nothing the writer wrote.",
  evidence:
    "Measured on 2026-09-02. `temper/game-combat-addon/src/ui/combat-log-ui.ts` line 18 writes `buffer.SetHandler(\"OnMouseWheel\", (_self, delta, ctrl, _alt, shift) => {`, guards with `if (typeof delta !== \"number\") return`, then multiplies. Against the shared declaration that guard narrows `never` to `never`, and the two later assignments refuse with `TS2322: Type 'number' is not assignable to type 'never'` — pointing at the assignment, not at the parameter that has no type.\n\nThe declaration is written at `akasha/temper/temper-eso-types/eso-ui/eso-ui.type-declaration.d.ts` line 30. A second `SetHandler` at `eso-objects-01` line 116 takes `(...args: unknown[]) => unknown` instead, so the two disagree about the same method name on different objects.\n\n`unknown[]` would infer usable parameters and still accept every handler, at the cost of refusing handlers whose parameters are declared narrower — which is why `never[]` is there. So the trade is real and the fix is not a one-word swap.\n\nThe call taken: `temper-combat-addon/combat-ui-log-window` annotates the five parameters `unknown` at the call site and keeps the guard. That is what every other inline handler in akasha must already be doing, and the cost is that the writer discovers it from an error about a number rather than from the declaration.",
} as const satisfies Finding
