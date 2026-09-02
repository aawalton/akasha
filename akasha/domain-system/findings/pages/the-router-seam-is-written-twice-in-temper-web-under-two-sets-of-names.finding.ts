import type { Finding } from "../finding.page-type.ts"

export const theRouterSeamIsWrittenTwiceInTemperWebUnderTwoSetsOfNames = {
  id: "01a0640f-8510-7a89-9480-07a12345b56d",
  pageTypeSlug: "finding",
  slug: "the-router-seam-is-written-twice-in-temper-web-under-two-sets-of-names",
  domainSlug: "domain/temper",
  claim:
    "`root.tsx` defines `PagesUILinkAdapter`, `LayoutLinkAdapter` and `SeamAdapters` inline, and `router-seam-adapters.module.code.tsx` defines the same four providers over the same four React Router calls. Both landed today. The module is what `app-shell.tsx` reaches, so neither can go until the components migration lands. Its exports are also renamed: `PagesUINextAdapter` is now `PagesUISeam` and `LayoutNextAdapter` is now `LayoutSeam`, because nothing here is Next.",
  evidence:
    "The module landed at `49863bf5a3` from `temper/web/app/bridge/lib/next-seam-adapters.tsx`. The inline copy landed at `d16bff5292` in `root.tsx` lines 75 to 114. Both wrap `PagesUIRouterProvider`, `PagesUILinkProvider`, `LayoutRouterProvider` and `LayoutLinkProvider` around `useLocation`, `useNavigate`, `useSearchParams` and `Link`. The only difference is nesting order, and the four are independent contexts, so the order does not read.\n\nThe one live caller outside root is `temper/web/app/components/ui/app-shell.tsx:18`, which imports `LayoutNextAdapter` and `PagesUINextAdapter` from `@/lib/next-seam-adapters`. Whichever seat carries `app-shell` across will find that specifier dead and both names changed. That is the reason this is filed rather than left to be noticed.\n\nI did not collapse the two. Deleting the inline copy from `root.tsx` means rewriting six import lines and a JSX nesting in a file three sibling seats are landing into every few minutes, and I could not run the app to confirm the result. The typecheck audit would have caught a broken import but not a provider that renders in the wrong place. Under `Champions Not Owners` the test is holding what it takes to do it right, and being unable to see the rendered tree is not holding it.\n\nThe cheap resolution, once the components have landed: `root.tsx` imports `LayoutSeam` and `PagesUISeam` from the module and drops its own three functions, taking `Link`, `useLocation`, `useNavigate`, `useSearchParams` and `useMemo` out of its imports with them.",
} as const satisfies Finding
