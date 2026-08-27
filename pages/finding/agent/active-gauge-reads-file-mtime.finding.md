---
id: a3361570-6f7c-5884-b8cb-51f6f3a1e6f2
slug: active-gauge-reads-file-mtime
page-type-slug: finding
title: "Active gauge reads file mtime"
domain-slug: page-type/agent
---

# Claim

`ops seat active` reports a seat as ACTIVE from its transcript file's mtime, and something re-materializes those files, so a seat that last spoke hours ago reads as working — inflating the fleet concurrency gauge and making the signal unsafe for anything that acts on it.

# Evidence

Measured at 2026-08-09T23:20Z with `--window 30m`. The gauge reported 21 active of 32 running.

Five seats it called active, with the last entry actually carrying a timestamp inside the transcript against the file's mtime:

- `019fe7ea` #18228 — last entry 19:36:05Z, mtime 23:05:58Z
- `019fe745` #18203 — last entry 16:46:56Z, mtime 23:06:03Z
- `019fe739` #18196 — last entry 17:44:48Z, mtime 22:52:56Z
- `019fe720` #18192 — last entry 16:47:06Z, mtime 23:06:03Z
- `019fe718` #18193 — last entry 16:41:19Z, mtime 22:56:20Z

Every gap is between three and six and a half hours. The four seats the same gauge called inactive have mtimes of 19:08Z to 21:16Z, older than the window — so the reported flag tracks mtime exactly, and the agent's own writing not at all.

`~/agents/<id>/` for these seats was last written at 11:44 and 13:36, which is the other reading agreeing: nothing on the agent's side has moved.

Found while dry-running a prototype that would stop what `ops instructions sweep-seats` names. The gauge was consulted as a safety check — is this seat working? — and would have vetoed stopping the five seats that most needed it.
