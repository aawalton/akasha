---
id: 8d802934-2058-5efa-aad4-e2c8d54a5e2d
slug: rpc-callsite-excusal-first-wins-in-file
page-type-slug: finding
title: "Rpc callsite excusal first wins in file"
domain-slug: domain/global
---

# Claim

`check-rpc-access-grants` drops a browser-client RPC callsite when the same RPC name is called on a service-role client earlier in the same file, so that callsite is never judged against the authenticated grant it needs.

# Evidence

Measured by the parent of tree #18682 on branch `project-18682`, against the pure function rather than the check shell.

`extractRpcCallsites` builds its result in a `Map` keyed on the RPC name and guarded by `!byName.has(rpcName)`, so the first callsite for a name wins and later ones are discarded before any judging happens. Fed one source holding both client kinds calling `shared_thing`:

- service-role call written first → `[{"rpcName":"shared_thing","serviceRole":true}]`
- browser call written first → `[{"rpcName":"shared_thing","serviceRole":false}]`

The flag is decided by source order. Where it lands `true`, the check shell's `continue` sends the name to `serviceRoleNames` and it is excused, so the browser callsite is never checked for a grant. That is a false negative in the unsafe direction — the 403 this check exists to prevent would reach production.

WHAT BOUNDS IT. The shell is sounder than the extractor. A non-service-role callsite is added to `sqlByName` and judged whatever any other file did with the same name, so the defect cannot span files. It needs one file holding both client kinds calling one RPC name, with the service-role call textually first.

IT IS LATENT RATHER THAN LIVE. Walking every tracked `.ts` and `.tsx`: 8 files hold both an `rpc` call and `createServiceRoleClient`, and **0** of them call any one RPC name on both client kinds. So nothing is being missed today, and the row that found the service-role design was correctly passed rather than blocked on this.

The repair is small and has an obvious shape — key the map on name plus receiver, or stop deduping in the extractor and let the shell decide — but it should be taken with a test that pins the ordering case, because the defect is invisible in any single-order fixture and both orders read as correct in isolation.

The design this sits inside is sound and should not be undone in passing: excusing a service-role receiver is what stops this check demanding that browser sessions be granted EXECUTE on procs that mutate game state.
