import type { Finding } from "../finding.page-type.ts"

export const theTrayIconIsEmbeddedRatherThanPointedAt = {
  id: "01a06039-9b92-7c9d-a6ca-9614ebad9284",
  pageTypeSlug: "finding",
  slug: "the-tray-icon-is-embedded-rather-than-pointed-at",
  domainSlug: "domain/temper",
  claim:
    "`assets/icon.ico` did not come into akasha, and the path the crate page carries in its place does not reach the picture the way the compiler needs. `crate-icon-path` is read against the repository root, whereas the tray embeds the picture with `include_bytes!` against the source file's own folder. So the page tells a reader where the icon is and tells a build nothing, and the picture is the one part of the crate a seam could not work out from akasha alone.",
  evidence:
    'akasha/temper/watcher-tray/pages/watcher-tray-tray/watcher-tray-tray.rust-module.rust.rs holds `const ICON_BYTES: &[u8] = include_bytes!("../assets/icon.ico");`, which rustc reads against the directory of the file holding it rather than against the repository root. akasha/code-system/rust-crate/properties/crate-icon-path.text-property.ts:16 says the path is read against the repository root, and :24 says the icon lives outside akasha. The crate page therefore carries `iconPath: "temper-watcher/tray/assets/icon.ico"`, a path into the very tree this migration is meant to empty. A seam copying the crate out would have to place the 4286 byte file at `../assets/icon.ico` beside the copied sources, and nothing on the page says that is where it goes.',
} as const satisfies Finding
