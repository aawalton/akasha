---
id: c2206011-91e5-5249-9846-d97fa7dad0f6
slug: rc-status-outlives-consumer
page-type-slug: finding
title: "Rc status outlives consumer"
domain-slug: domain/instrument
---

# Claim

The OAuth proxy still serves `GET /rc-status`, the RC-connection sensor three separate headers describe as deleted and as false from birth. Its only caller is its own unit test, which keeps it green, and the comment above it still names the supervisor's RC-absence monitor — deleted — as its consumer. A reading nothing should trust is still there to be taken.

# Evidence

The route moved into akasha with the proxy. `tools/lib/model-gateway/gateway.ts:137` serves it, in the same two lines the reading below took from `packages/agents/oauth-proxy/src/oauth-proxy.ts:223`:

    if (req.method === "GET" && url.pathname === "/rc-status") {
      return Response.json({ rcConnections: rcConn.getCount() })

and line 114 still describes what it is for — "the supervisor's RC-absence monitor via `GET /rc-status`" — a monitor that no longer exists.

Grepping `packages/` and `tools/` for `rc-status`, excluding `dist/`, returns nine hits: six in `packages/agents/oauth-proxy/src/oauth-proxy-rc-status.unit.test.ts`, the two in `oauth-proxy.ts` above, and one prose mention in `packages/agents/supervisor/src/supervisor-remote-control-default.ts`. No production consumer.

Three live headers say the counter is both deleted and worthless:

- `supervisor-remote-control-default.ts`: "`rcConnections` (the socket's fd count via `/rc-status`) was therefore a FALSE sensor from birth — `0` is the normal reading of a fully-working RC seat (Alan drove interactive seats all session at `rcConnections: 0`)", and "#15120 restores this union and deletes the false rc-absence sensor built on that counter".
- `packages/agents/supervisor/src/rc-degraded-config.ts`: "the deleted `rcConnections` proxy-unix-socket fd counter (#15120), which read `0` on a fully-working seat and was a false sensor from birth — do NOT conflate the two."
- `packages/agents/shared/edge-connection-count.ts`: the same "deleted `rcConnections`" phrasing.

What was deleted was the consumer, not the sensor. The endpoint, the counter behind it and a test file asserting its shape all stand, so a future reader looking for a seat-health signal finds a served, tested, documented endpoint whose documentation elsewhere says it means nothing. `#15104` is on record as having already read that meaningless zero once and gated headless personas out of the app on it.

Read against the code repo working tree of 2026-08-07.

Re-measured 2026-08-27 against akasha. The endpoint and its counter stand; the only tracked files naming `rc-status` outside this page are the gateway itself and its two test files, `tools/tests/model-gateway-gateway-rc-status-carried.test.ts` and `tools/tests/model-gateway-gateway-vectors.ts`, so there is still no production consumer. What did not survive the move is the documentation: the line-114 comment naming the RC-absence monitor is gone, and so are all three headers calling the counter a false sensor — `false sensor` now matches this page and nothing else. The reading is still there to be taken, and nothing beside it says not to.
