---
id: 4ef80ba0-c3a3-5b2c-a480-2e3ac0c15ee0
slug: psql-pipe-truncates-silently
page-type-slug: finding
title: "Psql pipe truncates silently"
domain-slug: domain/database
---

# Claim

`ops db psql` hands back a PREFIX of a large result whenever its stdout is a pipe, even where the consumer reads the pipe to the end. The verb's help names only the other truncation — a consumer closing the pipe early and psql taking SIGPIPE — so the shape an agent actually reads through is the one the help does not describe.

# Evidence

Reproduced 2026-08-07. One query, `select generate_series(1,20000)`, run twice with `-tAc`.

Through a pipe whose consumer reads every byte — `| cat > file` — the file held 19,184 of 20,000 lines and the verb exited 1, stderr carrying `could not print result table: Resource temporarily unavailable`. Redirected to a file with no pipe, the same query delivered 20,000 and exited 0. `cat` read to EOF, so this is not the SIGPIPE case.

THE MECHANISM. `O_NONBLOCK` lives on the open file description and a dup SHARES it. The `ops` process arms its own stdout asynchronously while psql is already running, so psql's inherited fd 1 goes non-blocking underneath it, its write takes EAGAIN, and it gives up mid-result. A child checking its flags once at startup reads blocking and is right, then wrong — which is why the obvious probe misleads.

WHAT MAKES IT SAFE TODAY. It is loud. The verb writes onto stdout, after the rows: "!! The query did not complete, so any rows above are partial and a count taken from them is wrong." That notice and the non-zero exit are the whole of the protection. Nothing structural stops a caller taking the rows and ignoring both, and the shape producing it — a read piped into a filter, or the verb spawned from agent code — is the ordinary agent read path.

THE HELP DESCRIBES THE OTHER CASE. `ops db psql --help` has a paragraph on a consumer that closes the pipe early: reported on stderr, exit left as the work produced it. It has none on this one, where the consumer is innocent and the shortfall comes from the writer's side.

NOT CLAIMED. No threshold — 20,000 truncates and the boundary was not searched for. Not that any live reading has been wrong because of it. Not a remedy: a blocking fd for the child reaches well past this verb.

Raised while ingesting `dirty/skills/agent-harness/findings/exit-codes-and-output-channels.md`, whose July 2026 entry measured 11,616 of 20,000 piped against 20,000 unpiped. Same defect, ten days on, same stderr string.
