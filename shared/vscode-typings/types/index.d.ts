// The editor's API is ambient: `vscode` is injected by the editor host and is no runtime module,
// so its typings are a `declare module 'vscode'` block rather than a file anything imports.
//
// The block is the `vscode-api` type declaration, and it stands beside its page at
// `akasha/editor-extension/vscode-api/vscode-api.type-declaration.d.ts`. That page states what it
// is: a restatement of the editor fork's own `src/vscode-dts/vscode.d.ts`, written by no hand, and
// a promote of the fork refuses while the two differ. Referencing it is what lets akasha see the
// fork's API without a second copy that can fall behind the first.
//
// A `reference path` is resolved against the real directory of the file holding it, so this path
// is written relative to `shared/vscode-typings/types/` and not to the `node_modules/@types/vscode`
// symlink bun installs. A `types` field in the manifest resolves the other way, against the
// symlink, which is why the manifest points here rather than across.
//
// This sits under `types/` because the repository ignores every `*.d.ts` as something tsc emitted,
// excepting the hand-written ones that live there and everything under `akasha/`.
/// <reference path="../../../akasha/editor-extension/vscode-api/vscode-api.type-declaration.d.ts" />
