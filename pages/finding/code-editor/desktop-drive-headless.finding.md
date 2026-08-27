---
id: 65986f5f-2961-5218-acfb-f6601a00690f
slug: desktop-drive-headless
page-type-slug: finding
title: "Desktop drive headless"
domain-slug: domain/code-editor
---

# Claim

The editor's DESKTOP build does not render its workbench when driven headlessly in the `vscode-cut` container, while the SERVED build driven the same way renders completely. The desktop renderer fetches its entry module over `vscode-file://` and fails, so `.monaco-workbench` never appears.

# Evidence

Measured on 2026-08-12 against `/var/home/walton/code-editor-staging` at `fd907ea`, whose `out/` had compiled clean in the container in 86.6s with zero `error TS` and carried 5144 emitted `.js` files — the same count as the working checkout's `out/`, file for file.

Driving the SERVED build of that identical `out/` with `tools/gate.sh --skip-compile` returns `GATE VERDICT: PASS` on 8 of 8 checks: the workbench renders with its eight parts, a file opens and tokenises, panes split, the panel toggles, a terminal executes with proof read from the pty, and no workbench view fails to render.

Driving the DESKTOP build of that same `out/` through `playwright-core`'s `_electron` under `xvfb-run` in the same image, with `--no-sandbox` and `--shm-size=2g`, times out waiting for `.monaco-workbench`. The renderer window exists at `vscode-file://vscode-app/repo/out/vs/code/electron-browser/workbench/workbench-dev.html`, but its body holds only `<script src="./workbench.js" type="module"></script>` and the page error is `Failed to fetch dynamically imported module: vscode-file://vscode-app/repo/out/vs/workbench/workbench.desktop.main.js`. That file is present and 12673 bytes.

Launched in the same container without Playwright attached, the app behaves the same way and opens DevTools itself, which reports 159 errors and shows `body { background-color: undefined; color: undefined }`.

With `--disable-gpu` the failure is broader: a scattered subset of several hundred `vscode-file://` module fetches fail with `net::ERR_FAILED` rather than the entry alone. Removing `--disable-gpu` reduces it to the entry module. The container's file-descriptor limit is 1048576, the same as the host's, and `out/` bakes in no absolute container path, so neither explains it.

The same desktop build runs correctly on the host — it is what Alan was running while this was measured.
