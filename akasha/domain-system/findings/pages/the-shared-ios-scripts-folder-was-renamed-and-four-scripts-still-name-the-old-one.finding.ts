import type { Finding } from "../finding.page-type.ts"

export const theSharedIosScriptsFolderWasRenamedAndFourScriptsStillNameTheOldOne = {
  id: "01a0657e-994b-72c0-bd83-4bb8c304ed8b",
  pageTypeSlug: "finding",
  slug: "the-shared-ios-scripts-folder-was-renamed-and-four-scripts-still-name-the-old-one",
  domainSlug: "domain/code",
  claim:
    "The shared iOS scripts folder is `akasha/code-system/ios-apps/scripts`, and four shell scripts across alanwalton and smilingjenny still resolve it as `shell-scripts`, a folder that is not there. Each one exits on its own guard, so neither app can run its seam or its add. A rename repointed the TypeScript importers and reached no shell script.",
  evidence:
    '`ls akasha/code-system/ios-apps/shell-scripts` answers that nothing is there; the folder is `scripts`, holding build-sim, build-stamp, monarch-url, stage-web-entry, widget-components and write-capacitor-config.\n\nThe four live lines, none of them in a comment:\nakasha/code-system/ios-apps/pages/alanwalton/scripts/ios-add/alanwalton-ios-add.shell-script.shell.sh:19 `SHARED="$(cd "$PACKAGE/../../shell-scripts" && pwd)"`\nakasha/code-system/ios-apps/pages/alanwalton/scripts/ios-seam/alanwalton-ios-seam.shell-script.shell.sh:36 `SHARED_IOS_SEAM_DIR="$AKASHA_HERE/ios-app/shell-scripts"`\nakasha/code-system/ios-apps/pages/smilingjenny/scripts/ios-add/smilingjenny-ios-add.shell-script.shell.sh:20 same `../../shell-scripts`\nakasha/code-system/ios-apps/pages/smilingjenny/scripts/ios-seam/smilingjenny-ios-seam.shell-script.shell.sh:24 `SHARED_IOS_SEAM_DIR="$IOS_APP_DIR/shell-scripts"`\n\nThe alanwalton line carries `ios-app/` as well, the singular folder, which is also gone. Both seams then guard on the sourced file and exit 1: smilingjenny at line 25 on widget-components and line 59 on build-stamp.\n\nThe shellcheck comment on the line below each source already spells the correct `ios-apps/scripts/...`, so the rename reached the comments and not the code that runs.\n\nThis was not fixed here because a lane is plainly mid-rename in those two folders and an edit would race it. atlas, which landed tonight, resolves the same folder correctly as `$IOS_APP_DIR/scripts` at akasha/code-system/ios-apps/pages/atlas/scripts/ios-seam/atlas-ios-seam.shell-script.shell.sh:9, so the correct spelling is in the tree to copy.',
} as const satisfies Finding
