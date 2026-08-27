---
id: 579d3692-c22c-5dd3-95be-41be1222acaf
slug: epilog-prose-unscanned
page-type-slug: finding
title: "Epilog prose unscanned"
domain-slug: domain/global
---

# Claim

`check-no-prose-flag-teaching` reads no prose from a `help.epilog` that is a function, and says nothing about the ones it skipped.

# Evidence

`CommandHelp.epilog` is typed `string | (() => string | Promise<string>)` at `packages/shared/cli-core/src/help.ts`. Measured across the whole `ops` registry on 2026-08-10, in worktree 18484: of the commands the registry declares, 30 carry an `epilog` that is a function rather than a string.

`helpSurfaceText` in `packages/infra/checks/src/checks/check-no-prose-flag-teaching.ts` builds the text it scans by walking the help object and keeping the values that are strings. A function is not one, so those 30 epilogs contribute nothing to the corpus that check judges — and its report names the carriers it did not reach without naming these, so a reader takes the `cli-help` carrier as read whole.

The sibling on the same registry is not in this position. `check-cli-help-flag-references` prints `UNEXAMINED, never absent:` and lists `epilog` blocks among what it did not read, so its zero is bounded where it stands.

Nothing here says the 30 hold a teaching site. What stands is that the check cannot say either way, and does not report that it cannot.
