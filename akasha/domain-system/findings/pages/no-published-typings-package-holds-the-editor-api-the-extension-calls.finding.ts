import type { Finding } from "../finding.page-type.ts"

export const noPublishedTypingsPackageHoldsTheEditorApiTheExtensionCalls = {
  id: "01a06469-aa91-7892-81cd-40ee823e4a18",
  pageTypeSlug: "finding",
  slug: "no-published-typings-package-holds-the-editor-api-the-extension-calls",
  domainSlug: "domain/akasha-migration",
  claim:
    "The editor is a private VS Code fork, and `editor-extension/generated/vscode.d.ts` is that fork's own API rather than a copy of anything published. Eight members the extension calls appear in no `@types/vscode` release, so the published package cannot replace the file. Putting the fork's own typings at `node_modules/@types/vscode` does, outside `akasha/` and wanting no tsconfig.",
  evidence:
    'Measured 2026-09-02.\n\nWhere it came from. The file shares sha256 `3dd71e2e...cc54` with `/var/home/walton/.local/share/code-editor/src/vscode-dts/vscode.d.ts`. That editor is a private fork: its `product.json` says "Code Editor" and its `package.json` says 1.110.0. `code-editor/tools/promote.sh:284` refuses a promote when the two differ, naming this path, so the copy is kept by hand rather than generated.\n\nNo published match. Of the 36 `@types/vscode` releases from 1.85.0 to 1.136.0 none matches, and at 746912 bytes the file is larger than the largest, 742310 at 1.136.0. Against its 1.110 base it adds `Terminal.rename` and `recolor`, `TreeViewOptions.showExpandAll` and `showFilter`, `TreeView.onDidChangeFilterValue`, `TreeItem.count`, and `TabInputTerminal.terminal` and `instanceId`, and drops `env.isAppPortable`. All eight are called from `src/`.\n\nProven rather than assumed. Under the settings at `code-typing.module.code.ts:16`, with an akasha file as the only root, `import * as vscode from "vscode"` and the fork\'s own members typecheck clean when the typings sit at `node_modules/@types/vscode`. Moving that folder aside answers TS2307, so the clean read belongs to the tree rather than the instrument.\n\nThat those settings are a literal, and that a `tsconfig.json` has no page type, are already said by `the-typecheck-that-runs-reaches-one-folder-and-the-one-reaching-wider-runs-nowhere` and `a-package-typecheck-config-has-no-page-type`. What is new is that this extension wants neither.',
} as const satisfies Finding
