---
id: 0f39cdd7-6e41-5b1d-825d-6f7e36ee7f58
slug: browser-suite-readiness-selector
page-type-slug: finding
title: "Browser suite readiness selector"
domain-slug: web-app/alanwalton-web
---

# Claim

The `.browser.test.ts` suite for `alanwalton/web` is red on a surface that renders correctly, because its readiness selector `article h1` matches nothing on the deployed reader.

# Evidence

Run on 2026-08-10 against `https://alanwalton.com`, the full nineteen-file suite reported 20 pass and 18 fail. Eight of the failures wait on `article h1`, six are `goto` timeouts on story-chapter and reading-story pages, five are hook timeouts, and one is a content assertion on the listen panel's narrator list.

Four explanations were excluded by measurement rather than by argument. Contention under a full-population run: `reader-scroll-restore` and `reader-prose-grammar` fail identically when run alone. Missing fixtures: `ensure-user` and `ensure-reader-fixture` were run and the failure did not move, and the `reader-fixture` rows stand in `pages`. A broken session: 20 tests passed, every failing test got past its own `expect(pathname.startsWith("/sign-in")).toBe(false)`, and the run log carries no 401. Electric being down: the pod has been Running 33 days with no restarts.

What the page actually does was then measured directly, as the owner rather than as the throwaway user. `ops browser-test verify-render` on `/story-chapter/the-factory-floor-2c88fd0e` PASSES on `--expect-text "The Factory Floor"` — non-blank, root present, no sign-in wall, no 404 — and FAILS on `--expect-count-selector "article h1" --expect-count 1`, finding 0. So the page renders and the selector is what is absent.

The four failing files were last touched 2026-07-12 and 2026-07-16, and no commit has reached the reader surfaces since 2026-08-09. The suite is excluded from branch CI by design and keeps a deploy-time role, where the render gate drives three pages against `--expect-text` rather than against this selector — so nothing had exercised `article h1` since the markup moved.

Found while verifying project 18386, whose change is unreachable from a browser: no code in `alanwalton/web/app` fetches any of the seven gated feeds, and the one caller of the mint route sits behind `isNativeShell()`.
