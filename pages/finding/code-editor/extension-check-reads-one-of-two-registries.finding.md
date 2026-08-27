---
id: a9026974-1aac-523a-85b9-dfb097420772
page-type-slug: finding
title: "Extension check reads one of two registries"
domain-slug: domain/code-editor
---

# Claim

The check that settles whether Alan's editor loads one extension reads only the registries the editor fork names for itself, so a registration in `~/.vscode` would pass unseen.

# Evidence

`registryPaths` in `tools/checks/editor-extension-single.ts` builds its paths from the editor's `product.json`, taking `dataFolderName` and `serverDataFolderName` and adding a `-dev` variant of each. On this workstation both keys read `.openvscode-server`, so the check opens `~/.openvscode-server/extensions/extensions.json` and `~/.openvscode-server-dev/extensions/extensions.json` and nothing else. It reported one of two derived paths on disk, holding `[]`.

`~/.vscode/extensions/extensions.json` also exists here and carries an entry, `anthropic.claude-code`. It is never derived, so nothing of ours registered there would be seen. The check's own verdict line says it measured `over 1 extension registry(ies) his editor reads`, which reads as a complete denominator and is one of at least two registries present.

A SECOND THING, which corrects the assumption that made this look narrower than it is: neither pipeline mode writes a registry at all. `runCompile` in `move-to-vscode-extension.ts` runs `bun run compile` for both `build-only` and `install`, and that script is a single `bun build ... --outfile=out/extension.js`. The install phase differs only in running against `GIT_REPO_DIR` rather than the feature worktree. So the pipeline produced a bundle on disk and registered nothing, and the check measures registrations. The two never met, and a pass on one says nothing about the other.

Found while verifying criterion four of #18893. That verdict was measured against the registry the check opens rather than the one anybody assumed the pipeline wrote, and it came out the same either way.
