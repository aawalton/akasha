---
id: 21fc9046-57cb-5e61-a6e1-89da6b797dc1
page-type-slug: finding
title: "Finished seat stays live"
domain-slug: domain/global
---

# Claim

A dispatched seat that sends its handback and skips `ops seat stop` stays `running`/`live` on the roster indefinitely, and nothing on the roster parts it from a seat still working — so the seats that are finished and the seats that are mid-task read the same to whoever is deciding where to look next.

# Evidence

Nine seats were dispatched onto projects #18079, #18081, #18090, #18106, #18116, #18117, #18118, #18119 and #18120 between 2026-08-07 02:00 and 09:30 UTC, each running `domains/tasks/projects/build-singleton-commit.md` or `build-singleton-deploy.md`. Both documents carry the same final step: "**Send** your lead a message, then stop yourself" — the command is named and the reason is given.

Six exited. Three did not: the seats on #18079, #18116 and #18119. `ops seat list --parent-agent-id <lead>` reported all three `running`/`live` at 09:44 UTC, alongside six siblings reading `stopped`/`dead`.

All three had finished. `ops seat logs` on each shows its final message is the handback narrative, at message 19 of 19 (#18079), 31 of 31 (#18116) and 33 of 33 (#18119). All three projects were at `done` — completed 02:18:40, 06:05:28 and 09:05:36 UTC respectively, each verified and closed by the lead hours or minutes before the roster reading. Nothing was owed by any of them.

Nothing surfaced this. `ops seat exits` holds no record for any of the nine, dead or live, so the six that exited are as unaccounted for as the three that did not. `ops seat active --window 30m` reported the three as `active: true`, `false`, `false` — a split that tracks how recently each last wrote rather than whether it had work left, so the seat idle longest reads exactly like the seat still thinking. The state was found only because Alan looked at the roster himself and asked what three of his lead's seats were doing.
