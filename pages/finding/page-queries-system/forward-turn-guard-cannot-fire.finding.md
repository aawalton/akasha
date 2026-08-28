---
page-type-slug: finding
slug: forward-turn-guard-cannot-fire
title: "The double-forward guard in forward-turn.sh reads its failed read as a true empty, so it can never fire"
domain-slug: domain/page-queries-system
---

# Claim

`tools/lib/forward-turn.sh` reads its failed read of the seat page as a true empty, so the guard at `:52` that stops a turn being forwarded twice answers "not forwarded" whether it was or not — and the marker that would make it match is written back to the same dead origin under `|| true`. Nothing reaches the guard today, because no seat page states a recipient.

# Evidence

Read on 2026-08-28 against `abe6a84f2`, re-read the same day against `373132e0b`, both on `main`.

`tools/lib/forward-turn.sh:5` defaults `PAGE_QUERY_ORIGIN` to `http://127.0.0.1:8787`, on which nothing has listened since the page query service was deleted. At `:50-51`, `SENT=$(curl -s -m "$PAGE_PATIENCE" "${PAGE_QUERY_ORIGIN}/page/seat/${SEAT}" | jq … || echo "")` yields the empty string when nothing answers, and `:52` is `[[ "$SENT" == "$UUID" ]] && exit 0`. An empty `SENT` never equals a real `UUID`, so the already-forwarded check answers "not forwarded" in both cases.

The two failures compound. `:67-71` writes the forwarded uuid back through `patch-state` on the same dead origin and ends `|| true`, so the marker that would make the check match is never written either.

Whether a turn has in fact been forwarded twice: it has not, and cannot as things stand. `rg 'forwards-turns-to' agent/seat/*.md` matches no seat page, and `:22-23` reads that key and exits where it is unset — thirty lines before the first `curl`. So this is a trap rather than a fault, and it arms itself the moment one seat states a recipient.
