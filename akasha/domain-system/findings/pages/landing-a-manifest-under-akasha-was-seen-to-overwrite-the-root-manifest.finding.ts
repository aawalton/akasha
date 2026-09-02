import type { Finding } from "../finding.page-type.ts"

export const landingAManifestUnderAkashaWasSeenToOverwriteTheRootManifest = {
  id: "01a06471-8a2f-7000-b6c4-3d05e8a71b29",
  pageTypeSlug: "finding",
  slug: "landing-a-manifest-under-akasha-was-seen-to-overwrite-the-root-manifest",
  domainSlug: "workspace-package/command-system",
  claim:
    "Landing a new `package.json` under `akasha/` was seen once to leave the repository's root `package.json` holding the body of the new file. The root manifest lost its workspaces array and every dependency, in the working tree only — the commit was correct. Nobody has reproduced it, so this records an observation and not a mechanism.",
  evidence:
    "Seen 2026-09-02 while landing `akasha/editor-extension/package.json`, a six-line manifest, at `2abf58d75d`. Afterwards the root `package.json` held those six lines verbatim: 143 lines gone, the whole `workspaces` array and every dependency with them. The commit did not carry it — it names four paths and `git show HEAD:package.json` is right — so the working tree alone was hit, most likely while the lockfile was regenerated in the same call. It was put back from `git show HEAD:package.json` and the tree agrees with HEAD again: 147 lines, 47 workspace entries, 67 dependencies.\\n\\nWhy this is filed without a mechanism. Two attempts to reproduce it both answered `unchanged`, and both were blind: the first handed an identical body so no regeneration ran, and the second was refused by a manifest check before regeneration was reached. Neither could have shown the fault, so their agreement says nothing. What can be said is narrow — it happened during that write sequence, and the body left behind was exactly the `--content-file` handed in.\\n\\nWhy it is worth a page anyway. The damage is silent and total. A root manifest with no workspaces array breaks resolution for every package and every agent in the checkout, the commit looks clean, and `git status` is the only place it shows. In a worktree where a hook reverts `akasha/` constantly, everyone is trained to read a dirty root file as somebody else's business.\\n\\nUntil somebody catches it in the act: after landing a new `package.json` under `akasha/`, read the root manifest.",
} as const satisfies Finding
