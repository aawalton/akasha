---
id: 29d05420-f6cd-5fdc-a079-d2285daa597e
page-type-slug: finding
title: "The gateway tests cannot be edited, so the scratch they leak cannot be fixed"
domain-slug: domain/model-gateway
---

# Claim

The five `tools/tests/model-gateway-gateway-*-carried.test.ts` files fail the typecheck the write gate runs, on a line none of them has changed. Any write touching them is refused, so a defect standing in them cannot be repaired by the seat that finds it. One such defect stands now: each of the five makes scratch directories under `/var/tmp` and removes none of them.

# Evidence

`ops write` refuses every one of them with `TS2552: Cannot find name 'RequestInfo'` — at line 7 of `model-gateway-gateway-rc-status-carried.test.ts`, line 47 of `model-gateway-gateway-idle-timeout-carried.test.ts`, and line 49 of `model-gateway-gateway-inflight-endpoint-carried.test.ts`. Each is the `type UpstreamHandler` declaration, which no write of mine altered.

The refusal is not caused by what a writer changes. A patch adding one blank line and nothing else, to `model-gateway-gateway-rc-status-carried.test.ts`, is refused with the same error at the same line. The file does not typecheck as it stands.

`RequestInfo` is named in 18 files across the repository, twelve of them under `tools/tests`, so this is a condition of how these files are typechecked rather than a mistake in one of them.

The leak the refusal protects: measured on 2026-08-28 at commit 9bb53f06, `/var/tmp` held 4,928 `oauth-proxy-inflight-`, 4,898 `oauth-proxy-rc-`, 3,282 `oauth-proxy-unix-`, 1,643 `oauth-proxy-idle-` and 1,633 `oauth-proxy-rc-log-` directories — 16,384 in all, about a quarter of everything in `/var/tmp`. One run of the five suites makes ten more and removes none: `logDir` at module scope, and `sockDir` inside two tests, are each `mkdtempSync` with no matching removal. The fix was written and could not be landed.

Not measured: why `RequestInfo` resolves for some files and not these, and whether the other twelve `tools/tests` files naming it are refused too.

# Bearing

The same repair landed without trouble where the gate allowed it — `tools/page/page-file-named.unit.test.ts` and `page-file-suffixed.unit.test.ts` at commit f0895370, `tools/tests/supervisor-terminal-fixture.ts` at c7c91c07 — so the pattern is settled and only these five are held out. Observed 2026-08-28 by seat astra.
