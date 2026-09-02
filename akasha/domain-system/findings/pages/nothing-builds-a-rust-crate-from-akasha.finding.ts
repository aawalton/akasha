import type { Finding } from "../finding.page-type.ts"

export const nothingBuildsARustCrateFromAkasha = {
  id: "01a06039-9b90-7cf6-8bf7-6f0a7d15b5fd",
  pageTypeSlug: "finding",
  slug: "nothing-builds-a-rust-crate-from-akasha",
  domainSlug: "domain/temper",
  claim:
    "The tray crate is recreated in akasha at `akasha/temper/watcher-tray`, and nothing compiles that copy. `rust-crate` calls a seam copying a crate's files to the names Cargo reads a departure, but no such seam is written, so the Docker image is still built from the files under `temper-watcher/tray`. Two copies of the same crate now sit in the repository with no check holding them equal, and an edit to the akasha copy alone changes nothing that ships.",
  evidence:
    'infra/k8s/src/temper-watcher/build/Dockerfile lines 7 to 10 copy `temper-watcher/tray/Cargo.toml`, `temper-watcher/tray/build.rs`, `temper-watcher/tray/src` and `temper-watcher/tray/assets` into the Rust builder, and line 36 takes `temper-watcher.exe` out of it. infra/cluster-checks/src/checks/check-eso-live-dir-candidate-order.ts:23 fixes `RUST_CRATE = "temper-watcher/tray"` and reads the source under it. The iOS family answers the same need with shell scripts named on the app page, for instance `shell-script/alanwalton-ios-seam` on akasha/code-system/ios-app/ios-apps/alanwalton/alanwalton.ios-app.ts:47, and the rust family has no equal. Until a seam is written, deleting `temper-watcher/tray` breaks the build and the cluster check both.',
} as const satisfies Finding
