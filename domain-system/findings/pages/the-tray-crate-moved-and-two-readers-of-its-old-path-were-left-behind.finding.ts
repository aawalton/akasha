import type { Finding } from "../finding.page-type.ts"

export const theTrayCrateMovedAndTwoReadersOfItsOldPathWereLeftBehind = {
  id: "01a0657e-994b-7af0-8cd2-15b99a82fc4d",
  pageTypeSlug: "finding",
  slug: "the-tray-crate-moved-and-two-readers-of-its-old-path-were-left-behind",
  domainSlug: "domain/akasha-migration",
  claim:
    "The tray crate is built from akasha now and `temper-watcher/tray` is gone, so two readers that fix its old path are broken. The Docker build was repointed with it; these two were not, because mending either one means teaching it to read the Rust file names off the pages rather than off the disk.",
  evidence:
    'infra/k8s/src/temper-watcher/build/Dockerfile now copies akasha/temper/watcher-tray/Cargo.toml and build.rs, then each of the six module bodies to the name Cargo reads, taken from the `moduleName` its page states: main, installer, logger, supervisor, tray, updater. Docker\'s COPY is the seam `rust-crate` calls a departure. The eight files were verified byte-identical by `git hash-object` against the akasha copies before they were deleted.\n\ninfra/cluster-checks/src/checks/check-eso-live-dir-candidate-order.ts:25 fixes `RUST_CRATE = "temper-watcher/tray"` and line 26 `RUST_CRATE_ROOT = ${RUST_CRATE}/src/main.rs`. It is not a one-constant repoint: `walkCrateSources` at line 39 reads the crate directory for `.rs` files, and `declaredCrateSources` at line 58 resolves each `mod X;` to a sibling `X.rs`. Under the akasha layout the body is at pages/watcher-tray-X/watcher-tray-X.rust-module.rust.rs, so both readings have to go through the pages and their `moduleName`.\n\ntools/lib/check-workflow/check-configs.ts:61 names `rust-file:code:temper-watcher/tray/src/tray.rs`. tools/ belongs to another lane and was not touched.\n\nThe icon is the one part that did not move. akasha/temper/watcher-tray/watcher-tray.rust-crate.ts:10 carries `iconPath: "temper-watcher/tray/assets/icon.ico"`, and `crate-icon-path` holds as a constraint that a crate\'s icon lives outside akasha, so the Dockerfile still copies `temper-watcher/tray/assets` and that one file is all that is left there.',
} as const satisfies Finding
