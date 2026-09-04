import type { Finding } from "../finding.page-type.ts"

export const theRouterSeamIsWrittenTwiceInTemperWebUnderTwoSetsOfNames = {
  id: "01a0640f-8510-7a89-9480-07a12345b56d",
  pageTypeSlug: "finding",
  slug: "the-router-seam-is-written-twice-in-temper-web-under-two-sets-of-names",
  domainSlug: "domain/temper",
  claim:
    "`root.tsx` defines `PagesUILinkAdapter`, `LayoutLinkAdapter` and `SeamAdapters` inline, and `router-seam-adapters.module.code.tsx` defines the same four providers over the same four React Router calls. Both render: `temper-app-shell.module.code.tsx` reaches the module, and `root.tsx` wraps the whole tree in its own copy. The module's exports are renamed — `PagesUINextAdapter` is now `PagesUISeam` and `LayoutNextAdapter` is now `LayoutSeam`, because nothing here is Next.",
  evidence:
    "The module landed at `49863bf5a3` from `temper/web/app/bridge/lib/next-seam-adapters.tsx`. The inline copy landed at `d16bff5292` in `root.tsx`. Both wrap `PagesUIRouterProvider`, `PagesUILinkProvider`, `LayoutRouterProvider` and `LayoutLinkProvider` around `useLocation`, `useNavigate`, `useSearchParams` and `Link`. The only difference is nesting order, and the four are independent contexts, so the order does not read.\n\nThe components have since landed and the source is gone, so the reason this was filed is spent. `next-seam-adapters.tsx` was ablated at `6b6695cac9` on a body match with the module, and `temper/web` holds no tracked file at all now. The reader is inside akasha: `temper-app-shell.module.code.tsx` imports `LayoutSeam` and `PagesUISeam` at lines 18 and 19 and wraps its children in both at lines 114 to 118. So both copies render, `root.tsx` around the whole tree and `temper-app-shell` again within it. The inner providers carry the same values, so the doubling costs a little rendering rather than reading wrong.\n\nThe resolution offered before is now open and its precondition met: `root.tsx` imports `LayoutSeam` and `PagesUISeam` from the module and drops its own three functions, taking `Link`, `useLocation`, `useNavigate`, `useSearchParams` and `useMemo` out of its imports with them. It is unlanded for the reason it was unlanded before — collapsing the two moves which providers render where, and nobody has yet run the app to see the result.",
} as const satisfies Finding
