import type { Finding } from "../finding.page-type.ts"

export const theIosAppMarkdownPageTypeWentAndEveryIosDeployNowRaises = {
  id: "01a0688f-4b1d-7000-8a3c-9c2a7e105f61",
  pageTypeSlug: "finding",
  slug: "the-ios-app-markdown-page-type-went-and-every-ios-deploy-now-raises",
  domainSlug: "domain/akasha-migration",
  claim:
    "The break an earlier finding warned would follow from ablating the `ios-app` markdown has already landed, by another road. `mobileApps()` no longer answers three apps; it raises `PagesUnread`, so every `akasha deploy` road that names an app is dead rather than reading stale pages. That earlier finding reads as a thing still to be careful about, and it is instead a thing that has happened.",
  evidence:
    'Measured 2026-09-03. `readFilePages("ios-app", ["slug"])` raises `PagesUnread: the ios-app pages went unread, so no page can be called present or missing: names no page type whose pages are files`. `pages/page-type/` holds no `ios-app.page-type.md`. The sole caller is `akasha/mobile-cli/mobile-app/mobile-app.module.code.ts:99`, inside `mobileApps()`, and it catches nothing.\n\nControl: the same call for the seeded slug `zzz-known-absent-control` raises the identical error, so this instrument does not tell a page type that went from one that never was. It tells only that neither is readable, which is what the claim is about.\n\nThe same shape, one module over, was a live silent-wrong-answer bug fixed at `5067d0d085`. `cut-fingerprint` caught `PagesMissing` and answered it as an empty set, so from `c5fe126be1` (the markdown cuts go, 11:50) to `50c062b7e1` (their page type goes, 12:00) every app read as owing a cut while six cuts stood for `alanwalton`. After 12:00 it raised instead, which is why a reading of `null` taken in that window did not reproduce later. `cut-fingerprint` held the only `PagesMissing` catch in the repository; there is now none, so no reader left can turn an unreadable source into an empty one.\n\nWhat is owed is unchanged from `akasha-deploy-reads-the-ios-app-markdown-rather-than-the-akasha-pages`: four `APP_KEYS` properties stand nowhere in akasha, and atlas has no akasha `ios-app` page. What has changed is the urgency, because there is no longer a working markdown road to fall back on while that is built.',
} as const satisfies Finding
