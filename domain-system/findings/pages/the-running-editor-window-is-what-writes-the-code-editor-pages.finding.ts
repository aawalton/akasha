import type { Finding } from "../finding.page-type.ts"

export const theRunningEditorWindowIsWhatWritesTheCodeEditorPages = {
  id: "01a0655a-2a43-7fcb-b79c-7c88d1657889",
  pageTypeSlug: "finding",
  slug: "the-running-editor-window-is-what-writes-the-code-editor-pages",
  domainSlug: "domain/akasha-migration",
  claim:
    "The editor window open on this checkout is what writes the four `code-editor-*` page folders, through its own `editor-layout` feature, a quarter second after every tab, group or terminal change. It resolves where each page goes by reading `pages/page-type/code-editor-*.page-type.md` on every write, so taking those four page type files away stops the writer as surely as taking the pages away, and the window must be closed before either is moved.",
  evidence:
    "Traced 2026-09-02 21:22, six minutes after the last such commit.\n\n`editor-extension/package.json` names `./src/extension.ts` as the extension's main, so the host loads the TypeScript in the tree rather than a build. `src/extension.ts:26` starts the `editor-layout` feature. `src/features/editor-layout/activate.ts:33-38` schedules a write on `onDidChangeTabs`, `onDidChangeTabGroups`, `onDidOpenTerminal` and `onDidCloseTerminal`, debounced by `SETTLE_MS = 250`, and line 71 calls `arrangedResponse`.\n\nThat is `tools/lib/editor-arrangement.ts`, whose `WRITER` at line 14 is `editor-pages-writer`, the name every one of these commits carries. `landArrangement` at lines 194-211 builds the page set, and `goneFor` at line 136 and `whereFor` at line 168 each ask `registryOf(diskFileTree(roots))`, so the page type files are read from disk on every write rather than once at load. A page type it cannot find answers `is not a page type this service writes`, which the feature logs and drops.\n\nThe host process started 09:47 and the last write landed 21:22. `services/sweep-editor-pages.ts` is the other half: it takes away pages whose window or terminal process is proven gone, and resolves its folders the same way.\n\nThis is what `six-folders-are-superseded-or-live-state-and-should-go-rather-than-migrate` left open when it said the folders need whatever writes them to stop first.",
} as const satisfies Finding
