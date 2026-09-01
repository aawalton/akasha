import type { Finding } from "../finding.page-type.ts"

export const appsTsWaitsOnTheIosAppPagesMovingIntoAkasha = {
  id: "01a05c4f-e44d-7427-b73a-10e4a58eec7c",
  pageTypeSlug: "finding",
  slug: "apps-ts-waits-on-the-ios-app-pages-moving-into-akasha",
  domainSlug: "domain/alan-harness",
  claim:
    "apps.ts cannot read ios-app pages the way app-building does. readFilePages reads the markdown at pages/ios-app/, whose three pages state 18 keys; the two akasha ios-app pages state five of them and atlas has no akasha page at all. Eight properties would join the ios-app page type and atlas would be dropped or carried in first. So apps.ts waits on those pages moving into akasha rather than on a rewrite, and its three escapes stand with it.",
  evidence:
    "APP_KEYS names 18. Five stand on the akasha pages already as display-name, bundle-id, development-team, icon-path and build-script; app-slug is the page's own slug, native-shell-repo-path is the folder it stands in, and widget-bundle-id, app-profile-name and widget-profile-name come off the ios-program pages exactly as app-building reads them. Eight are stated nowhere in akasha: www-stage-script, spa-source-repo-path, web-env-path, asc-capabilities, mac-build-lock-dir, mac-build-number-file, mac-www-staging-rel and default-device-udid. Every one of the 18 has a live reader; mac-build-lock-dir alone is read eight times in build-serialization.ts.\n\natlas is the harder half. It stands only in the markdown, its shell under native-shell/atlas carries no ios directory, and nothing passes --app atlas outside a help example at tools/commands/mobile/deploy-testflight.ts:79. But mobile-vocabulary.ts builds APP_FLAG.choices from the page set, so seven commands advertise it, and an akasha page for it needs a manifest, a capacitor config and a gitignore standing beside it.\n\nTwo corrections. package-reached-where-named exempts a specifier landing on a page, so the four ios-program reaches were never its business; what wanted the exports keys was module resolution, and they now resolve at compile and at run. tools/lib/ios-widget-swift.ts reads pages/ios-app markdown directly by parsing its frontmatter, so the page engine is not the only reader of these pages.",
} as const satisfies Finding
