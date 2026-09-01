import type { Finding } from "../finding.page-type.ts"

export const anAliasHidesMostOfWhatReachesIntoAWebAppFolder = {
  id: "01a05b56-acd8-7833-8080-fe245c19e793",
  pageTypeSlug: "finding",
  slug: "an-alias-hides-most-of-what-reaches-into-a-web-app-folder",
  domainSlug: "workspace-package/checks",
  claim:
    "Counting what reaches into a folder by tracing relative imports understates it by an order of magnitude, because `alanwalton/web` reaches into its own subfolders through the `~/*` tsconfig alias rather than by relative path. `app/lib` reads as zero inbound when only relative paths are traced and carries 88 alias imports from 54 files outside it. A move planned on the relative count leaves almost every importer dangling.",
  evidence:
    "`alanwalton/web/tsconfig.json` maps `~/*` to `./app/*`. Every reach between the app's subfolders is written either way, and the two are not interchangeable to a reader that knows only one.\n\nTracing relative imports into the three largest unpackaged folders under `alanwalton/web/app` finds 13: ten into `app/awen` and three into `app/idle`, all from `app/routes`. `app/lib` finds none. Tracing `~/` imports as well finds 114: `app/lib` takes 88 from 54 distinct files, `app/awen` takes 3 more, `app/idle` takes 10 more.\n\nThe alias importers are not confined to `app/routes`, which is what the relative count suggests. `app/lib` is reached from `app/components` (17), `app-capacitor/routes` (9), `app-capacitor` itself (5), `app/questions`, `app/hooks`, `app/push`, `app/device-secret`, `app/awen` and `app/idle`. `app-capacitor` is a sibling tree of `app`, so a search scoped to `app/` misses it entirely while the alias still resolves into `app/lib`.\n\nThe alias also hides a cycle. `app/lib/capability-registrations.ts` imports ten names under `~/idle/`, and three files under `app/idle` import `~/lib/api-fetch`. `app/lib` and `app/idle` are mutually dependent, which the relative imports of neither folder show.\n\nThis sits beside `a-move-inside-breaks-what-is-outside`, which counted fifty-three relative imports reaching into akasha and noted that nothing checks them. The alias means the true count is larger than that one found, and grows as folders move in.",
} as const satisfies Finding
