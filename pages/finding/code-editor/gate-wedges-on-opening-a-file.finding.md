---
id: da9565ea-d513-5a16-afdb-68b7eed88543
page-type-slug: finding
title: "Gate wedges on opening a file"
domain-slug: domain/code-editor
---

# Claim

`tools/browser-gate.mjs` cannot return a verdict: clicking a file row in the explorer leaves the renderer unable to answer any further `page.evaluate`, so the gate stops at C5 and waits forever. The build Alan runs today wedges identically, so this is the driver rather than a regression in any commit.

# Evidence

Found on 2026-08-19 by the seat promoting twelve commits after the repository move. Three consecutive `gate.sh --skip-compile` runs against the candidate stopped at the same place, each with `PASS C5 workbench renders, 8 parts` and nothing after it, and the promote sat on the first one for half an hour before anybody looked.

Measured with a probe that logs each step rather than by reading the source. Against the candidate build: `page.evaluate` returns in milliseconds before the click — both the C5 parts query and a bare `1 + 1` — and never returns after it. The same probe against `code-editor-live` at `d40f959`, which is the build Alan was running while it ran, gives the same result at the same step. Both were driven through `scripts/code-server.js` in `localhost/vscode-cut:local` with `--disable-workspace-trust`, the arrangement `gate.sh` uses.

The renderer processes sit at 0% CPU throughout, so nothing is spinning. Its console log stops the moment the click lands. The server log in the container is clean and keeps serving.

What this costs is the whole gate. C5 is the last check that runs, so C6 file management, legibility, panes, layout and terminal, and C7 markdown, are all unmeasured — and the promote reads an unanswered gate as a build that will not come up. The promote of `d431b2c` was landed with `--skip-gate` for that reason and its stamp records `"gate": "skipped"`.

Two repairs went in beside this and neither addresses it: `page.screenshot` now carries a timeout, and the whole run now carries a deadline that names the last check it recorded and exits non-zero. Those turn an indefinite hang into a bounded failure. They do not make the gate able to pass.

The desktop build does not wedge. Alan opened a TypeScript file in his own editor on `d431b2c` and it opened and coloured normally, so this is the served half or the containerised drive of it, not the workbench both halves share. That narrows where a fix would look, and it is why the promote was safe to make without a verdict.
