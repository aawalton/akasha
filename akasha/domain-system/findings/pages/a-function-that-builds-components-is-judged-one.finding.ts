import type { Finding } from "../finding.page-type.ts"

export const aFunctionThatBuildsComponentsIsJudgedOne = {
  id: "01a06212-abeb-7000-8e35-59dd8dd35ebd",
  pageTypeSlug: "finding",
  slug: "a-function-that-builds-components-is-judged-one",
  domainSlug: "domain/akasha-check",
  claim:
    "`identifier-matches-its-place` judges a function a component when JSX sits anywhere in its body, because `drawing` reads the whole subtree and never halts at a nested function. A factory returning a map of components, and a hook building JSX as data, are refused under names neither can take: `MakeDefaultComponents` is no component, and `UseAppNavItems` breaks the rule that a hook name begins with use. Halting that reading at a function boundary does not close it; the refusal only moves inward.",
  evidence:
    "Measured 2026-09-02 against the check own `refusedIn`, over the 79 files then left in `shared/pages-ui/src`.\n\n`drawing` at `akasha/checks/code-checks/pages/identifier-matches-its-place/identifier-matches-its-place.code-check.code.ts:65` reads with `ts.forEachChild` and returns true at the first `JsxElement`, `JsxSelfClosingElement` or `JsxFragment`. Nothing halts it at a function boundary, so every JSX node a nested function holds is read as the outer function own.\n\n`shared/pages-ui/src/markdown/markdown-renderer.tsx:37` held `makeDefaultComponents`, a factory returning a `Components` map for react-markdown, whose JSX is in the map arrow values. It landed only after the factory went, the map becoming a module-level constant. The restructure is `364b3f87c4` and the module landed at `2caf154cb2`.\n\n`shared/pages-ui/src/components/use-app-nav-items.tsx` is the one left, and it carries two refusals rather than the one first filed. Re-measured 2026-09-02 by running `refusedIn` over the real body: `useAppNavItems` at line 44 and `toNavItem` at line 197, each judged a component and each wanting upper camel. `toNavItem` is a nested arrow whose JSX sits directly in the object literal it answers with.\n\nSo halting that reading at a function boundary is not the fix. Run with that one guard added, the same body still refuses `toNavItem` at 197: the refusal moves down a level rather than away. Only a rule reading a component off what a function returns lets both through, and that is a wider change than this one line.",
} as const satisfies Finding
