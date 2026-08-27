---
id: f1b30e88-1361-56e2-bd70-38c22828e4f5
page-type-slug: finding
title: "Render gate story control flakes"
domain-slug: repo/code-repo
---

# Claim

The deploy render gate's `story-control` target reaches its settle budget and reports INDETERMINATE on a page that is healthy, failing the deploy over content already landed on `main`. Both of the gate's other targets passed in the same run, including the client-store hydration target the gate exists to guard, and the same verb over the same page with the same flags returned PASS minutes later with nothing changed in between.

# Evidence

THE RUN. #18969's deploy, 2026-08-13. `ops project deploy` exited 3 with its two claims split: `the-branch-content-on-main` PASS (landed 5947c4d4d2c0) and `the-deployed-main-pipeline` FAIL at `deploy_render_gate_failed`. The gate line reads `awen-game: pass, story-control: indeterminate (after retry), throwaway-custom-display: pass`. Phase `[6/7] verify main deploy on 5947c4d` had already passed, so main CI succeeded and only the post-land gate failed.

THE TARGET IS THE CONTROL. `move-to-deploy-render-gate.ts`'s header says the story control exists so that "a blank game with a healthy story pinpoints a store/hydration regression; a blank story too points at a broader deploy failure." Here the game was healthy and only the control stalled, which is neither signature.

REPRODUCED, THEN PASSED. The target is the oldest `story-chapter` row by seq asc, and `targetFromRow` sets `expectText` to its title and passes no `hydrationSelector`. I read the row: id `019db5f4-0c22-7882-8bca-8eb92c88fd0e`, title `The Factory Floor`, so the expected text was right and a mismatch is excluded. The gate's own invocation, `verify-render --url https://alanwalton.com --path /story-chapter/the-factory-floor-2c88fd0e --page-type story-chapter --expect-text "The Factory Floor"`, returned INDETERMINATE at http 200. The identical command minutes later returned `"verdict":"PASS"` with `contentSettleTimedOut` false and `expectedText` present. No deploy, commit or restart happened between them.

THE BUDGETS. First attempt on the verb's 60s default, then one retry after `RETRY_BACKOFF_MS` 5000 with `RETRY_NAV_TIMEOUT_MS` 120000. Both timed out, so the settle time straddles even the doubled budget under deploy load while completing outside it.

NOT MEASURED. How often it flakes, the page's actual settle time, and whether the stall is the reader's own hydration or host contention. I changed nothing in the gate.
