// The editor's API is ambient: `vscode` is injected by the editor host and is no runtime module,
// so its typings are a `declare module 'vscode'` block rather than a file anything imports.
//
// The block lives at `editor-extension/generated/vscode.d.ts`, and it stays there because
// `code-editor/tools/promote.sh` compares that exact path byte-for-byte against the fork's own
// `src/vscode-dts/vscode.d.ts` and refuses the promote when they differ. Referencing it is what
// lets akasha see the fork's API without a second copy that can fall behind the first.
//
// A `reference path` is resolved against the real directory of the file holding it, so this path
// is written relative to `shared/vscode-typings/types/` and not to the `node_modules/@types/vscode`
// symlink bun installs. A `types` field in the manifest resolves the other way, against the
// symlink, which is why the manifest points here rather than across.
//
// This sits under `types/` because the repository ignores every `*.d.ts` as something tsc emitted,
// excepting the hand-written ones that live there.
/// <reference path="../../../editor-extension/generated/vscode.d.ts" />
