---
id: 6192d65b-3c35-55b3-bac4-633f0fe399e5
page-type-slug: finding
title: "Prose flag guard thinned"
domain-slug: domain/agent-harness
---

# Claim

Project #17867 deleted the PreToolUse hook that refused `$( )` and `${ }` inside a declared `ops` prose flag. The one control left over that construct does not scan the corpus the founding incident happened in.

# Evidence

Verified 2026-08-07, raised by two independent `review-check` readings that reached it from different checks.

The hook is gone. `~/instructions/tools/hooks/` holds `block-substituting-backtick.sh` and no prose-flag hook. `ops enforcement list --grep prose` returns three check-steps and zero hooks. Commit `f6a05da416` under #17867, 2026-08-05, states it: "The wrapper, its IO shell and its CLI suite are deleted."

The successor covers less, and says so. `block-substituting-backtick.sh --scope` prints under DOES NOT COVER: "$( ) and ${ }, which carry the same hazard and are REQUIRED syntax. A universal guard cannot refuse them, and this is the coverage its ancestor had and it gives up: inside a declared `ops` prose flag, those two were refused as well." It adds that only exit 2 blocks, so it closes anything only while healthy, and that nothing observes its health file automatically.

The three surfaces that named the deleted consumer are repaired under #18453: each now names `check-no-prose-flag-teaching`, which reads the committed artifact off disk and holds no freshness check of its own.

The remaining control does not reach the incident's corpus. `check-no-prose-flag-teaching` covers the construct, and the pod log for step 27361 reports carriers scanned repo-doc and cli-help, carriers NOT scanned instructions and page-row, 714 documents. The instructions repository holds 2,009 documents and is where all 342 sites of #16322 stood. The check discloses the gap on every run.

The founding incident is #16320, backticks in `ops seat send --content` executing as shell commands, named there as a command-injection surface.

NOT MEASURED. Whether any live site carries the construct — one reviewer ran the check over 2,749 documents including the whole instructions corpus and found zero, so this is a control gap rather than a breach. Whether the deletion was ruled on with the loss understood.
