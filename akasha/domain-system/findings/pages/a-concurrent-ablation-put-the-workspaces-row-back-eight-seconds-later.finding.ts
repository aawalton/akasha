import type { Finding } from "../finding.page-type.ts"

export const aConcurrentAblationPutTheWorkspacesRowBackEightSecondsLater = {
  id: "01a0637d-4e11-7d63-b824-91ac05e3b7f2",
  pageTypeSlug: "finding",
  slug: "a-concurrent-ablation-put-the-workspaces-row-back-eight-seconds-later",
  domainSlug: "domain/temper",
  claim:
    "The clobber the swarm was warned about happened and was silent. `akasha remove` took `temper/addons` out of the root workspaces list and said so, and eight seconds later another seat's ablation of a different package put the row back. Neither command refused, neither commit conflicted, and the lockfile was made again from the restored row. A removal that reports success is no evidence the row is gone a minute later.",
  evidence:
    '`6a7f9fbbee` at 12:10:20 removed the 78 tracked files under `temper/addons` and dropped `"temper/addons",` from `package.json`, answering `package.json stopped naming 1 workspace this removal empties`. `a5bb42398a` at 12:10:28, whose subject was `temper/shared-interface-selector-addon`, shows `+    "temper/addons",` beside `-    "temper/shared-interface-selector-addon",` in the same hunk pair. It also rewrote 27 lines of `bun.lock`, restoring both `@temper/addons` entries.\n\nWhy git did not catch it. The two edits sit five lines apart in one 40-line sorted array, so the second seat\'s write, computed against a base that still held the row, restored it as ordinary content rather than as a conflict. A surgical one-row edit anchored on both neighbours is not enough on its own: mine was, and it was still overwritten by a whole-list write.\n\nWhat closes it is re-reading the row after the removal lands. Put back by `ab7fa17e69`, anchored on `"stories/text",` above and nothing below, which also made the lockfile again and took both `@temper/addons` entries out.\n\nThe cost of missing it is a deploy: the finding `four-folders-went-and-the-root-workspaces-refused-every-deploy` records the other direction of the same file.',
} as const satisfies Finding
