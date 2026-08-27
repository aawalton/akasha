---
page-type-slug: finding
id: e98508ba-5466-5b62-94a5-fa393917dea2
slug: path-seams-outside-the-typecheck-graph
title: "Four faults landed in one day through path seams typecheck cannot see"
domain-slug: domain/agent-harness
---

# Claim

Four live faults landed on 2026-08-21, all of one shape: a file named as a string rather than imported, so the typecheck gate held nothing when the file moved or went.

# Evidence

`monarch/merchant.ts` read its merchant vocabulary at `new URL("./merchants.md")`. The page moved to `pages/category-rule-merchant/`, and every module importing `merchantOf` then died at import with ENOENT.

`monarch/rule-documents.ts` walked `readdir` at `monarch/category-rules/<kind>/`. The rules moved to `pages/category-rule-{code,agent}/`, and git tracks no empty directory, so the two old folders survived the move empty. `loadCategoryRules` read them, found nothing, and answered zero rules with no error. It stood that way from 13:25 until the repair, while 104 code rules and one agent rule stood at the new location. `apply`, `propose`, `review`, `agree` and `categorize-recent` all take their rules from that call.

`tools/statusline.sh` spawns `"$HERE/lib/seat-children-live.ts"`. Commit `d65658b73` deleted that file at 08:03 as part of removing a command beside it. Bash spawns rather than imports, so nothing in the module graph held it, and `2>/dev/null || echo 0` turned the failure into a count of zero. Commit `319d44feb` repaired the identical fault in August, when `agent-children-live.ts` went the same way.

`tools/lib/turn-end-decide-call.sh` filtered the wrapper's own exit line out of what a refused seat is shown. Commit `2ca58293d` at 07:30 changed how the judge is reached and replaced `grep -v '^error: "ops" exited with code '` with a bare `cat` in the same diff, so every refused turn since carried that line into the seat.

A sweep over the whole class found seventeen seams: one script path spawned from a shell script, and sixteen paths built with `new URL(..., import.meta.url)` across `tools/`, `monarch/` and `services/`. Every one of the seventeen now resolves to a file that stands. Two of them were the broken ones above.

Three of the four were silent: a zero count, a zero rule set, and an extra line of output. Only the ENOENT announced itself.
