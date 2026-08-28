---
id: a97c76dc-daca-5c82-9a1e-1a46addd8f3a
slug: transient-signin-discards-its-cause
page-type-slug: finding
title: "Transient signin discards its cause"
domain-slug: repo/akasha-repo
---

# Claim

A transient throwaway sign-in failure in `verify-render` discards its own cause and fails a deploy unretryably. `harness-launch.ts:32` throws a plain `Error` carrying only `signIn.error.message`, empty in the observed case, and the retry classifier admits only `TimeoutError` — so a condition that self-healed minutes later reached the render gate as a genuine failure, and the deploy reported FAIL over content already landed.

# Evidence

Read in the akasha working tree, 2026-08-27.

THE THROW KEEPS ONE FIELD. `shared/browser-test-harness/src/harness-launch.ts:32`: `if (signIn.error) throw new Error(\`harness sign-in (supabase-js): ${signIn.error.message}\`)`. Only `.message` survives; `signIn.error`'s status, code and name are not read anywhere on this path.

THE RETRY CLASSIFIER CANNOT SEE IT. `tools/lib/verify-render-plan.ts:103-105` is `isRetryableSessionOpenTimeout(err) { return err instanceof Error && err.name === "TimeoutError" }`, and `tools/commands/browser-test/verify-render.ts:87` is `if (!isRetryableSessionOpenTimeout(err)) throw err`. A `new Error(...)` has name `"Error"`, so this throw is never retried.

THE TEST IS ON THE NAME. The classifier reads `err.name` and nothing else, so a bad credential, a missing env var and an empty supabase-js error are one class to it.

THE INCIDENT, REPORTED RATHER THAN RE-OBSERVED BY ME. #16313's deploy, 2026-07-28 ~00:55Z: `verify-render exited 70 (not PASS/FAIL/INDETERMINATE): harness sign-in (supabase-js): {}` on `throwaway-custom-display (/idle)`, at `deploy_render_gate_failed`. The same page and flag returned `VERDICT: PASS`, exit 0, minutes later with no intervention, and a live-identity `verify-render` passed during the same window — so it was isolated to the throwaway `BROWSER_TEST_*` sign-in and self-healed. I did not reproduce it; the code paths above are what I verified.

THE COST IS AT THE DEPLOY. The branch content had landed and the main pipeline had completed, so the tree was live and correct while the deploy reported FAIL. The two verdicts are reported separately (`the-branch-content-on-main` PASS, `the-deploy` FAIL), so the true state is readable past the headline.

NOT MEASURED. How often it fires, and whether the supabase-js error object carries a code the throw could capture.
