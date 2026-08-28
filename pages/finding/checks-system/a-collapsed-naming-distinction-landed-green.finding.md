---
id: 01a046c8-3ce9-78ed-a695-87875358a572
slug: a-collapsed-naming-distinction-landed-green
page-type-slug: finding
title: "A repair that collapsed a naming distinction landed green and was caught only by a person"
domain-slug: domain/checks-system
---

# Claim

A change that silently disabled device authentication passed every gate, passed the suite, and was recorded as a repair. It was found because a coordinator sent the agent back over unrelated ground, and for no other reason. Four things stand in it, and the fourth is the one nobody will rediscover: the cause was reading a naming distinction as untidiness. `userId` names a column the row store settles; `user-id` names a property a page holds in its own file. Two different things, one apparent difference in spelling, and the change unified them on the reasoning that a key should not behave two ways. No check can see that, because at every layer the collapsed version is the tidier one.

# Evidence

Landed and reverted 2026-08-27 within the hour, commits `671d14c9d` and `4866ffc09`.

**What it did.** `fileValuesOf` skips every key in `SETTLED_ELSEWHERE`, a set spelled camel because camel is what the row store calls its own columns. The change asked `SETTLED_ELSEWHERE.has(camelizeKey(rawKey))` instead of testing the raw key, so both spellings collapsed onto the camel one and `user-id` began being dropped. `device-secret` and `device-token` declare `key: user-id`, their writers pass it in kebab at `alanwalton/web/app/device-secret/lib/device-secrets.server.ts:53` and `shared/notifications/src/device-token.ts:20`, and all twelve of their files carry it. `device-secrets.server.ts:34` reads the page back through that key and returns `null` without it. The result is an authentication that quietly stops recognising anyone, with every write still reporting done. Measured against the landed code: `fileValuesOf("write", "device-secret", { "user-id": "u9", "device-id": "d1", "secret-hash": "h" })` returned `{"device-id":"d1","secret-hash":"h"}`.

**The suite stayed green.** `shared/pages-access/src/file-write.unit.test.ts:75` asserted `fileValuesOf("op", "t", { pageTypeSlug: "t", userId: "u", note: "x" })` keeps only `note`. That pins the camel spelling. Nothing pinned kebab. A test that asserts one half of a distinction reads exactly like a test that asserts the distinction — it is the same length, it names the same function, and it passes for both the code that holds the distinction and the code that has destroyed it. Seventeen other cases in the same file also passed, along with 1,084 in the pages-system suite, `tsc -b --force` at exit 0, and nine akasha gates over the change.

**Nothing in the process caught it.** It went through `ops write`, was judged by the gates, was verified by its author against the tests and the typecheck audit, and was reported as a repair with a measurement showing both spellings behaving identically — which was true, and was the defect. It surfaced only when a coordinator, ruling on a different question about the same finding, asked how many other properties declared a key in that set. Answering that question is what made the author read the device page types.

**The cause was reading a distinction as an accident.** The finding the agent was working from named the asymmetry itself: "`userId` is dropped and `user-id` would not be." The agent read that sentence as a defect report rather than as a description of two different things, because an undeclared distinction and an oversight are indistinguishable from the code. Nothing at the seam said which it was. This is the failure Ubiquitous Naming exists to prevent, arriving from the opposite side: not one concept spelled two ways, but two concepts that look like one concept spelled two ways. A check cannot tell those apart, and neither could a reader, because the difference lived nowhere but in the heads of whoever wrote the set.

**The repair, and its positive control.** The ordering is reverted and the reason is now stated at the line rather than left to be inferred. `file-write.unit.test.ts` gained a case pinning both spellings together — that `user-id` is kept and `userId` dropped in the same assertion. It was proved awake rather than asserted awake: run against the reverted-from code it fails on exactly the regression, `want {"user-id":"u","device-id":"d"}` against `got {"device-id":"d"}`, while the pre-existing camel assertion passes. That contrast is the evidence, since a case that fails where the old one passes is a case that covers what the old one did not.

What this leaves for the checks system is a question rather than a defect to fix: whether anything can be judged about a test that pins one side of a two-sided rule, given that from the outside it is indistinguishable from a test that pins both.
