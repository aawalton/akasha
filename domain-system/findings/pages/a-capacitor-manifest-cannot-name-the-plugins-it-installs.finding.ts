import type { Finding } from "../finding.page-type.ts"

export const aCapacitorManifestCannotNameThePluginsItInstalls = {
  id: "01a0657e-994b-7691-a021-58c3ded0198a",
  pageTypeSlug: "finding",
  slug: "a-capacitor-manifest-cannot-name-the-plugins-it-installs",
  domainSlug: "domain/code",
  claim:
    "`manifest-names-what-is-reached` refuses every Capacitor dependency a shell package names, because nothing in such a package imports them: `cap sync` reads them from the manifest. atlas landed with its dependency block removed to get in at all, and the block is held here so it is not lost.",
  evidence:
    "The block taken off akasha/code-system/ios-apps/pages/atlas/package.json to land it: dependencies `@capacitor/core` ^8.4.1, `@capacitor/ios` ^8.4.1, `@capacitor/preferences` ^8.0.1, `@capgo/background-geolocation` ^8.3.1; devDependencies `@capacitor/cli` ^8.4.1. Restore it verbatim when the check admits them.\n\nThe check has one escape, at akasha/checks/code-checks/pages/manifest-names-what-is-reached/manifest-names-what-is-reached.code-check.code.ts:246: `if (dep.startsWith(CAPACITOR) && config !== null && standing(config)) return true`, where CAPACITOR is the literal `@capacitor/` and `standing` asks whether the package folder holds the file named by the `capacitor-config` file property. It did not fire for atlas, whose folder does hold `atlas.ios-app.capacitor-config.json`. Two things are wrong with it independently. The config lookup did not resolve, since the property's file is named for its page as `atlas.ios-app.capacitor-config.json` rather than by a fixed name the folder could be asked for. And the vendor prefix is hard-coded, so `@capgo/background-geolocation`, a Capacitor plugin like the others, is refused however the config is resolved.\n\nalanwalton and smilingjenny name the same kind of dependency and are not refused only because checks judge the paths a landing names, and nothing rewrites their manifests. Rewriting either one today would refuse the same way. So this blocks any new Capacitor app and any edit to the two that exist.\n\nThe decision this informs is whether the escape should read the plugin list from the capacitor config, or whether a package may state that its dependencies are reached by a tool rather than by an import.",
} as const satisfies Finding
