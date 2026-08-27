---
id: e7600ff3-9661-5f7a-810c-11c6e264ee9c
page-type-slug: finding
title: "Reply park untested"
domain-slug: domain/seat-turn-end
---

# Claim

The `awaiting-reply` allow grants a headless seat an unbounded park on a reply, testing neither that the party owing it is alive nor how long the park has stood — where the `held-wake` arm beside it probes the holder and can answer `custodian-dead`.

A seat parked this way and a seat whose principal never came back are the same record.

# Evidence

`tools/lib/headless-halt-wake.sh` takes the allow on the `no-binding` arm: `[[ "$OUTBOUND" == "awaiting-reply" ]] && { record allow awaiting-reply; exit 0; }`, under a comment calling it "THE ONE PLACE A SEND LICENSES A STOP". Nothing on that path calls a probe. The `held-wake` arm immediately above it consumes `holderProvenDead` from `ops seat held-wake` and carries a `custodian-dead` exit whose own text says "waiting longer is the one response that cannot work".

Measured 2026-08-10 at 13:25Z: two of the eight live spawned seats hold that park, both having reported their work finished.

- `019fe8cb` `athena-project-lead-define-project` — `allow awaiting-reply` recorded at 2026-08-10T00:50:30Z, its last message opening "#18246 is verified and done." Silent 12.6 hours at the reading.
- `019fe8ae` `claude-ios-install-worker-ship-install` — `allow awaiting-reply` at 00:11:13Z, last message opening "Everything Amy assigned is done and verified." Silent 13.2 hours.

`ops seat held-wake --json` answers `no-binding` for both now, with `statuses: []`: neither claims a project row, so the project carrier that would otherwise witness the park has nothing to say, and this arm is the only thing standing between them and a block.

Across `~/agents/hook-decisions/*.jsonl` from 2026-07-28 to 2026-08-10, `allow awaiting-reply` is recorded 437 times. `block custodian-dead` is recorded twice in the same span, on 2026-07-29 and 2026-08-05.

NOT MEASURED. How many of the 437 were parks on a reply that arrived. Whether any age threshold would separate the two seats above from a legitimate short park. Whether `ops seat blocked-census`'s liveness arm would reach this case if the seats had recorded a `blockedOn` rather than sending — it read `holderAlive 0` over 453 rows on the same run.
