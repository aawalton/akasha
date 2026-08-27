---
id: 03123121-5305-58c3-ab21-a1f57cacff36
slug: apns-topic-acceptance-for-jenny-never-settled
page-type-slug: finding
title: "Whether APNs accepts the Jenny topic under the existing key was never settled"
domain-slug: domain/alanwalton-ios-notification
---

# Claim

Whether APNs accepts `me.smilingjenny.app` as a topic under the existing key has never been settled, and #19374 was closed on Alan's ruling without it.

# Evidence

Everything upstream of the topic is verified. Her registration route answers 200 admitted, 404 unadmitted with no cookie, and 400 on a malformed body against the deployed site; the fan-out is scoped to the surplus-fall kind; the notifier's checkout carries the code and booted after it landed. TestFlight build 18 is tester-visible, and `me.smilingjenny.app` carries `[IN_APP_PURCHASE, PUSH_NOTIFICATIONS]` in App Store Connect, read there on 2026-08-18, where the baseline before that build had push absent.

The one thing missing is a real device token from her app. Probing both topics with a bogus token answered `BadDeviceToken` on each, which looks like a pass and is not one: a topic that cannot possibly be ours answers the same way, so APNs rejects the token before it weighs the topic and the probe separates nothing.

Alan ruled on 2026-08-18 to assume success and close the project, saying he would raise a new item if it fails on the next natural experiment. So the first real send to her phone is the experiment, and a silent non-delivery is the failure shape to watch for: nothing reports a push that APNs refused on its topic.
