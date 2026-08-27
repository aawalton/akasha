---
id: cc3878ca-badd-57e5-b82a-751e870c50bf
slug: sweep-guard-checks-the-wrong-env
page-type-slug: finding
title: "Sweep guard checks the wrong env"
domain-slug: domain/global
---

# Claim

The obligation-gate integration suite guards on live infrastructure by checking `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`, but the behaviour it exercises runs in a spawned `ops` subprocess that reaches postgres directly and needs `DATABASE_URL`. The nightly sweep pod carries the first two and not the third, so the guard passes and the subprocess fails. The skip built on it is sound, so what is wrong is only the set of variables it is given to decide on.

# Evidence

Measured 2026-08-17 around 13:00Z, after `slow-suite-red` fired at 09:32:59Z and stood for three hours.

The reading is one file: the sweep records `red` as `redFiles.length` at `run-sweep-and-notify.ts`, and reported `ran` 486, `red` 1, `entered` naming `move-to-obligation-gate.integration.test.ts`. The pod log's "shard 8/11 FAILED — 54 suite(s)" is that shard's assignment list rather than its failures; the bun output under it carries exactly one `(fail)`.

The failure is an assertion on a subprocess's own words: line 129 expects the refusal to contain `awaiting_manager_seat` and receives `postgres-store: DATABASE_URL names no database to reach`.

The suite spawns rather than calls. `moveTo` runs `Bun.spawn(["bun", CLI_PATH, "project", "move-to", ...])`, so the behaviour under test is the deployed command reaching postgres directly, while the fixture setup around it uses the in-process pages client.

The guard checks the other half. `haveLiveInfra` requires `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` and names `DATABASE_URL` nowhere. Its skip works — `describe.skipIf(!haveLiveInfra)` at line 79 wraps the one top-level block holding all four inner ones — so the machinery is right and only its input is wrong, which makes the repair a one-line widening.

The sweep pod carries exactly the two it checks: the `slow-suite-sweep` cronjob lists `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in its container env and no `DATABASE_URL`. That is why the fifty-three sibling database suites in the same shard passed.

It is green on the workstation, four runs for four at 19 pass 0 fail, because a shell here exports `DATABASE_URL` and the child inherits it. That is the second cause `domains/alerts/slow-suite-red.md` already names: the workstation and the pod disagreeing rather than code broken on main.

Not established: whether giving the sweep pod a `DATABASE_URL` is open at all — an excluded entry records the pod as dummy-only under a standing Safety ruling, which is a decision rather than an oversight.
