import type { Finding } from "../finding.page-type.ts"

export const aRustCratePageHoldsNoGitIgnore = {
  id: "01a06039-9b93-729a-b7ff-5e970e45c1c7",
  pageTypeSlug: "finding",
  slug: "a-rust-crate-page-holds-no-git-ignore",
  domainSlug: "workspace-package/code-system",
  claim:
    "`temper-watcher/tray/.gitignore` did not come into akasha, because `rust-crate` declares no property holding it. Its one line is `target/`, and nothing in the repository root ignores that name, so wherever a seam lays the crate out for Cargo the build artifacts show up as untracked files. `ios-app` already holds the same thing as `git-ignore`, so the property is only missing from the Rust page type rather than from akasha.",
  evidence:
    'temper-watcher/tray/.gitignore is 8 bytes and reads `target/`. The repository root .gitignore is 35 lines and names no `target`. akasha/code-system/ios-app/ios-apps/alanwalton/alanwalton.ios-app.ts:15 carries `gitIgnore: "gitignore"`, and the file sits beside the page, so a file property of that shape is already proven. akasha/code-system/rust-crate/rust-crate.page-type.ts declares `cargo-manifest`, `rust-module-slugs`, `cargo-build-script` and `crate-icon-path` and nothing else. Of the ten tracked files under `temper-watcher/tray`, eight came into akasha and this one and `assets/icon.ico` did not.',
} as const satisfies Finding
