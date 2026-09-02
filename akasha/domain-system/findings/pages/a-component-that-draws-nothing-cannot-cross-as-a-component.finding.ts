import type { Finding } from "../finding.page-type.ts"

export const aComponentThatDrawsNothingCannotCrossAsAComponent = {
  id: "01a0643c-2ced-7fc1-acdc-ee360c7614b9",
  pageTypeSlug: "finding",
  slug: "a-component-that-draws-nothing-cannot-cross-as-a-component",
  domainSlug: "domain/temper",
  claim:
    "Temper's `PathTracker` was a React component whose whole body was an effect and whose return was `null`. Three akasha rules together leave no way to land it as a component, so it landed as the hook `usePathTracking`. Its one caller renders it as JSX and will not compile until that caller changes.",
  evidence:
    "Measured 2026-09-02 migrating `temper/web/app/components/utils/path-tracker.tsx`.\n\nThe three refusals, each read off the gate rather than guessed. The naming grammar refuses a function named `PathTracker` unless the checker reads it as a component, and it reads `return null` as a plain function, so it asked for `pathTracker` in lower camel. Lower camel cannot be rendered as JSX. Returning `<></>` to make the checker see a component was refused by `lint/complexity/noUselessFragments`. Returning a hidden element would put a node in the document that was never there.\n\nSo the shape changed rather than the name. `usePathTracking()` at `akasha/temper/temper-web/path-tracker/path-tracker.module.code.ts` holds the same effect with the same guard, and `getLastPath` and `clearLastPath` are unchanged beside it. The file is now `.ts` rather than `.tsx`.\n\nThe caller is `temper/web/app/routes/_app-layout.tsx:36`, which renders `<PathTracker />`. That route has not crossed yet. Whoever lands it calls the hook from the layout component instead of rendering a child, which is where the effect belonged anyway.\n\nWhat a later seat should take from this is the general shape rather than this one file: any temper component whose return is `null` will hit the same three rules, and the answer each time is that it was a hook wearing a component's name.",
} as const satisfies Finding
