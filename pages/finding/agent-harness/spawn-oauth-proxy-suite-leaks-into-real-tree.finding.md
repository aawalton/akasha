---
id: becc6433-6b76-5aa2-b86b-86bce2ea3234
page-type-slug: finding
title: "Spawn oauth proxy suite leaks into real tree"
domain-slug: domain/agent-harness
---

# Claim

`supervisor-spawn-oauth-proxy.unit.test.ts` in the code repository deposits a directory under the real
supervisors tree on every arm it runs, including the arms that write no state file, and removes only
the file inside it. 3,368 of those directories stand there.

# Evidence

Measured by the seat that ported that file on 2026-08-12, and reported with the count. The mechanism:
the suite's cleanup removes the state file but not the directory holding it, and the proxy child it
spawns creates that directory before it dies — so an arm that asserts adoption did NOT happen still
leaves one behind. The suite was GREEN over there when measured (8 pass, 0 fail), which is the point:
nothing about the leak turns anything red, on either side.

The ported copy in the instructions repository does not leak. That seat deliberately did not carry the
cleanup faithfully, and I approved it and generalised it — the `port-supervisor-file` task's stage 4 now
says to leave a fixture's leaks behind while carrying its assertions (commit e1b65dc82). The asymmetry
is why: a suite in the instructions repository runs on every `ops instructions run-checks`, which every
seat runs on every landing, where a suite over there runs when somebody chooses to. Carrying that
fixture faithfully would have multiplied the defect by the number of seats rather than preserved it.

The 3,368 were left alone. State an agent did not create is another agent's work until it finds out
otherwise, and clearing it is both the tidier act and the one that destroys the evidence for this
finding.

This is a finding against the code repository's copy rather than against any port. It does not block
removal under #18836 — removing that suite with the file it tests resolves it by deletion — but if that
suite outlives the port, or is carried anywhere else, the leak comes with it.
