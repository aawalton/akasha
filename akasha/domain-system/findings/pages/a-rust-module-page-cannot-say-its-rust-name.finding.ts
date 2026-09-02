import type { Finding } from "../finding.page-type.ts"

export const aRustModulePageCannotSayItsRustName = {
  id: "01a06039-9b91-71b6-8201-5833a287cbdd",
  pageTypeSlug: "finding",
  slug: "a-rust-module-page-cannot-say-its-rust-name",
  domainSlug: "workspace-package/code-system",
  claim:
    "A `rust-module` page holds only `rust`, so the page cannot say the file name rustc must read. Rust resolves `mod tray;` to a file named `tray.rs`, whereas a page's file is named for the page's slug, and a slug is unique across every rust module in akasha. The tray's six modules therefore landed as `watcher-tray-main` through `watcher-tray-installer`, and a seam copying them out would have to guess the Rust name by cutting a prefix nothing tells it.",
  evidence:
    "akasha/temper/watcher-tray/pages/watcher-tray-main/watcher-tray-main.rust-module.rust.rs declares `mod installer; mod logger; mod supervisor; mod tray; mod updater;`, each of which rustc resolves to a sibling file of that exact name. The unprefixed slugs are not open: `slug` is unique per page type and every Rust crate has a `main`, and a page's export name would collide besides, since akasha/code-system/ios-program/properties/main.named-file-property.ts already exports `main`. iOS met no such trouble because Swift attaches no meaning to a file name, which is why akasha/code-system/ios-component carries files like `categorize-ring.ios-component.swift.swift` and compiles. The mend is a property on `rust-module` holding the name Cargo reads, in the way `named-file-property` fixes `Cargo.toml` and `build.rs` for the crate.",
} as const satisfies Finding
