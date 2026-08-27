---
id: a97c76dc-daca-5c82-9a1e-1a46addd8f3a
page-type-slug: finding
title: "Transient signin discards its cause"
domain-slug: repo/code-repo
---

# Claim

A transient throwaway sign-in failure in `verify-render` discards its own cause and fails a deploy unretryably. `harness-launch.ts:54` throws a plain `Error` carrying only `signIn.error.message`, empty in the one observed case, and the retry classifier admits only `TimeoutError` — so a condition that self-healed minutes later reached the render gate as a genuine failure, and the deploy reported FAIL over content already landed.

# Evidence

THE THROW KEEPS ONE FIELD. `packages/shared/browser-test-harness/src/harness-launch.ts:54`: `if (signIn.error) throw new Error(\`harness sign-in (supabase-js): ${signIn.error.message}\`)`. Only `.message` survives; `signIn.error`'s status, code and name are not read anywhere on this path.

THE RETRY CLASSIFIER CANNOT SEE IT. `packages/shared/browser-test-harness/cli/src/verify-render-plan.ts:212-213` is `isRetryableSessionOpenTimeout = err instanceof Error && err.name === "TimeoutError"`, and `verify-render.ts:140` is `if (!isRetryableSessionOpenTimeout(err)) throw err`. A `new Error(...)` has name `"Error"`, so this throw is never retried.

THE CLASSIFIER'S HEADER ENUMERATES WHAT IT MEANS TO EXCLUDE, at `:206-208`: "Every OTHER session-open failure (bad credentials, missing env, a post-submit sign-in bounce) is a genuine failure that must stay loud, so it is NOT retryable." A supabase-js error carrying no message is none of those three, and is treated as all of them.

THE INCIDENT, REPORTED RATHER THAN RE-OBSERVED BY ME. #16313's deploy, 2026-07-28 ~00:55Z: `verify-render exited 70 (not PASS/FAIL/INDETERMINATE): harness sign-in (supabase-js): {}` on `throwaway-custom-display (/idle)`, at `deploy_render_gate_failed`. The same page and flag returned `VERDICT: PASS`, exit 0, minutes later with no intervention, and a live-identity `verify-render` passed during the same window — so it was isolated to the throwaway `BROWSER_TEST_*` sign-in and self-healed. I did not reproduce it; the code paths above are what I verified.

THE COST IS AT THE DEPLOY. The branch content had landed and the main pipeline had completed, so the tree was live and correct while the deploy reported FAIL. The two verdicts are reported separately (`the-branch-content-on-main` PASS, `the-deploy` FAIL), so the true state is readable past the headline.

NOT MEASURED. How often it fires, and whether the supabase-js error object carries a code the throw could capture.
