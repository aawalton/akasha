---
id: 194d9342-8b4e-5f26-9f7b-25595d79a7c0
page-type-slug: finding
title: "Three supervisors do not consume a proxy swap, so no command can move those seats onto a new gateway"
domain-slug: domain/model-gateway
---

# Claim

Three seats' supervisors do not consume a `proxy_swap` action, so those seats cannot be moved onto a new gateway by any command; one of them is running the code repository's gateway while stamped with the ported tree's hash, which reads as `current` and so is reported by nothing.

# Evidence

Measured 2026-08-17, after the supervisor entrypoint was repointed at `tools/lib/model-gateway/main.ts`.

`ops model-gateway swap --fleet` moved 18 of 21 live gateways onto the ported tree at `fdafda42c131`. Three did not move: `awen`, `ryn` and `thea`. Each returned `timeout`, and a targeted `ops model-gateway swap <seat>` returned the same: `supervisor did not consume requestedAction within 30000ms`, with `lastDispatchStatus=null`. All three seats read `running`.

Their gateways predate the retry and are alive: pid 2689126 (`awen`, started 13:54:58), pid 3046316 (`thea`, 14:08:37), pid 3907959 (`ryn`, 12:11:57). `ryn`'s predates the whole port, so an unconsumed action is not something the repoint introduced.

`thea` is the case nothing reports. Read from `/proc/3046316/`, her gateway's command line is `bun /var/home/walton/code/packages/agents/oauth-proxy/src/main.ts` while her `OAUTH_PROXY_VERSION` is `fdafda42c131`, the ported tree's hash. `ops model-gateway status` therefore reads her `current`, and the adopt-versus-respawn gate in `tools/lib/supervisor-spawn-oauth-proxy.ts` compares the same two values, so it will keep adopting her stale gateway. `awen` and `ryn` carry the old hash and read `lagging` honestly.

The mismatched stamp came from a window during the landing: her proxy respawned at 14:08:37, after the adopt gate began taking the ported tree's version (`43065ea35`) and before the entrypoint was repointed (`2386459c7`). That window is closed — the stamp and the entrypoint now move together — so the mismatch cannot recur, and what stands is the one seat carrying it.

What the mismatch costs is staleness rather than breakage: the code repository's gateway is the standing implementation and works. It clears when those seats' proxies next die or their supervisors resume consuming actions.

Two observations, not one, and they separate: a supervisor that consumes no action is the general fault, and it is what leaves the stamp mismatch beyond reach of the command built to clear it.
