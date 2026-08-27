---
id: b5600e41-1310-50df-9cfb-43243e297fa6
page-type-slug: finding
title: "Two reslug tests report as failures on every run because they read the whole corpus twice"
domain-slug: repo/instructions-repo
---

# Claim

Two tests in `tools/tests/reslug.test.ts` run past the five-second ceiling and are reported as failures on every run.

# Evidence

Running `bun test tools/tests/reslug.test.ts` reports the same two timing out at about 5.4 and 5.5 seconds against a ceiling of five: the one about a slug following its new filename, and the one about a move between folders leaving the slug alone. Seven pass. Both failures are timeouts rather than failed assertions, and both are the tests that survey a rename twice, each survey reading the whole corpus off disk.

They stand this way before and after the change made here today, which only shrank the set of frontmatter keys a rename repoints and does no additional reading.

Not measured: how long they have been over the line, whether the ceiling is the default or stated somewhere, and whether the same two run under the change-aware suite the repo prefers.
