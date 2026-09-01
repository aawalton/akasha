import type { Finding } from "../finding.page-type.ts"

export const alansWidgetCompilesOnceWwwIsStaged = {
  id: "01a05c71-f31f-7afe-b31c-419f1ffe49d0",
  pageTypeSlug: "finding",
  slug: "alans-widget-compiles-once-www-is-staged",
  domainSlug: "domain/alan-harness",
  claim:
    "Alan's widget Swift compiles. With `www` staged by hand, `akasha ios-app build alanwalton --www <dir>` exits 0 with BUILD_SIM_OK, and `alanwalton-widget-feed` went through a compiler for the first time with no error. What is still by hand is the staging: `alanwalton-stage-app` reads `NATIVE_SHELL_SPA_SOURCE_DIR`, which no akasha page states. `web-entry` is not the fix for that, because Alan's `www` is a built bundle rather than a boot page. `spa-source-repo-path` is.",
  evidence:
    "`alanwalton-stage-app.shell-script.shell.sh:8` refuses without `NATIVE_SHELL_SPA_SOURCE_DIR`, saying the ios-app page states `spa-source-repo-path`. No akasha page does: `ios-app.page-type.ts:52-62` declares nine properties and none is that, and `app-building.module.code.ts:55-71` exports ten `NATIVE_SHELL_*` names, none of them it. The value stands outside akasha, at `pages/ios-app/alanwalton-ios.ios-app.md:23` as `alanwalton/web`, beside `www-stage-script` on :22, read by `alanwalton/mobile-cli/src/lib/sim-www-stage.ts:13,162`. Handed that same path by name, the script exits 0 and writes 60 files under `www/`, `index.html` among them.\n\n`akasha ios-app build alanwalton --www <dir>` then exits 0. BUILD SUCCEEDED, no error, two warnings, both the captured-var pair at `AppDelegate.swift:979-980` that predates this. All 21 components the widget program names compiled into `ValuesWidgetExtension`, `alanwalton-widget-feed` among them, so its 147 lines with `HELD_FOR = 45 * 60` at :23 and `stillHeld(takenAt:)` at :33 are proven. Installed unsigned to a simulator.\n\n`web-entry` would not carry this. It is one committed `.html`, copied over `www/index.html` by `stage-web-entry`, for a shell whose site is remote; Jenny's is a redirect stub. Alan's `www/index.html` is a react-router build product naming hashed assets and inlining `NEXT_PUBLIC_*`, and his `.gitignore` says `www/` is no longer committed. Giving him `web-entry` either commits a build product or turns his in-shell SPA into a redirect, which is Alan's call rather than a build fix.",
} as const satisfies Finding
