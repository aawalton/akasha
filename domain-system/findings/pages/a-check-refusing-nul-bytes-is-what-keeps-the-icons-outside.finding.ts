import type { Finding } from "../finding.page-type.ts"

export const aCheckRefusingNulBytesIsWhatKeepsTheIconsOutside = {
  id: "01a06591-3502-7158-bab5-ff0707b010c1",
  pageTypeSlug: "finding",
  slug: "a-check-refusing-nul-bytes-is-what-keeps-the-icons-outside",
  domainSlug: "domain/akasha-check",

  claim:
    "`no-raw-nul-bytes` is what keeps both icons outside akasha, rather than anything about where akasha sits. It refuses any file carrying a NUL byte and is narrowed to `akasha/`, so putting a picture outside that folder is what makes it legal. Nothing else objects: the beside-file grammar, the length ceiling and the page-property machinery all hold a binary. Moving akasha to the repo root leaves an app icon nowhere legal, since every file will be in akasha and every file must be claimed by a page.",
  evidence:
    'Measured by running the patch-phase checks in process over a change naming one binary beside-file. With `akasha/temper/watcher-tray/watcher-tray.rust-crate.icon.ico` carrying the 4,286 bytes of `temper-watcher/tray/assets/icon.ico`, three refusals came back: `file-has-its-page` because no page claims it, `no-raw-nul-bytes` at 174 NUL bytes, and `page-named-as-stated` threw at akasha/checks/modules/change-walking/change-walking.module.code.ts:242, where `bodyOf` decodes UTF-8 with `fatal: true`. Declaring the property first clears two of the three: a second run naming the page, the 13,210 byte `AppIcon-1024.png` as `alanwalton.ios-app.icon-drawing.png`, and the removal of the svg beside it, left `no-raw-nul-bytes` alone at 2,616 NUL bytes, beside a type error owed only to `IconDrawing` being written `"svg"`. `file-length` passed both icons, the 15,000 byte ceiling being above 13,210. akasha/checks/modules/checking/checking.module.ts says the change a check is run over is narrowed to the akasha folder and a path outside it is input to no check. no-raw-nul-bytes.code-check.ts says `Every file in the akasha folder is judged` and `No kind of file is exempt`, and it runs on patch, worktree, deploy and audit. The commit adding `icon-path`, 0a95316d73, says the icon is the one thing a build needs that akasha cannot hold. To bring an icon in, `no-raw-nul-bytes` would have to exempt a declared file property, against its own invariant that no kind of file is exempt. The alternative is that the icon is made at build time from the `icon-drawing` svg akasha already holds, which no seam does today: alanwalton-app-icon.shell-script.shell.sh copies `$ICON_SOURCE` and rasterizes nothing.',
} as const satisfies Finding
