---
id: 166acad0-ee88-594b-aa8a-b11280caccb3
page-type-slug: finding
title: "Deploy skips a zone it cannot find"
domain-slug: domain/global
---

# Claim

A Cloudflare zone the deploy cannot find is treated as a zone to skip, so a host declared on it ships no DNS record and the deploy still reports success.

# Evidence

`_cf_build_zone_cache` in `packages/infra/lib/deploy-functions.sh` caches one unfiltered `GET /zones?per_page=50`. `_cf_find_zone` takes the longest suffix match over that cache, and a miss reaches `warn "No Cloudflare zone found for $hostname — skipping"` then `continue`. Nothing downstream reads that warning, so the deploy is green and the hostname does not resolve. The call is also unpaginated, a second way to miss a zone once the account passes fifty.

THE MISS IS NOT HYPOTHETICAL. Three measurements of the same token against the same zone on one night disagree. The seat on #18081 measured `GET /zones?name=smilingjenny.me` returning `total_count: 0`. Hours earlier another agent measured the unfiltered listing returning five zones twice, then six including it minutes later. Later still, amy measured it present once by name and ten times out of ten unfiltered.

WHAT IS UNSETTLED IS THE CAUSE, NOT THE DEFECT. Either the token is scoped to a hand-picked list something has since added this zone to, or it reaches the account and Cloudflare's index lagged a zone activated 2026-07-29. A token cannot read its own policies — `GET /accounts/{id}/tokens` returns 9109 to itself — so only the account holder can look. Under both readings the deploy hides the same failure.

`packages/infra/k8s/cloudflared/foundation.workflow.ts` writes the sops `CLOUDFLARE_API_TOKEN` to `/tmp/.cloudflare/api-token` for `sync_tunnel_dns`. That value is byte-identical to the one in `~/.secrets.env` — both `cfat_L3Kg9sy…`, 53 characters — so CI and a workstation run authenticate as the same principal.

`smilingjenny.me` resolves and serves today; its apex record was written by hand and survives CI's prune, because the prune never enumerates a zone the cache missed.
